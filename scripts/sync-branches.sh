#!/usr/bin/env bash
# sync-branches.sh — Merge validated repair PRs, clean processed branches, and
# keep main stable and production-ready.
#
# Usage: bash scripts/sync-branches.sh [--repo <owner/repo>] [--dry-run]
# Requires: gh (GitHub CLI), git
set -euo pipefail

REPO="${REPO:-}"
DRY_RUN=false
REPAIR_PREFIX="swarm-repair-"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --repo)    REPO="$2"; shift 2 ;;
    --dry-run) DRY_RUN=true; shift ;;
    *)         echo "Unknown argument: $1"; exit 1 ;;
  esac
done

if ! command -v gh &>/dev/null; then
  echo "Error: gh (GitHub CLI) is required but not installed."
  exit 1
fi

if [ -z "$REPO" ]; then
  REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || true)
  if [ -z "$REPO" ]; then
    echo "Error: Could not determine repository. Pass --repo <owner/repo>."
    exit 1
  fi
fi

DRY_LABEL=""
$DRY_RUN && DRY_LABEL=" [DRY-RUN]"

echo "═══════════════════════════════════════════════"
echo "  SWARM Branch Sync${DRY_LABEL}"
echo "  Repo: $REPO"
echo "  $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo "═══════════════════════════════════════════════"

# ── 1. Collect open repair PRs ────────────────────
echo ""
echo "▶ [1/3] Scanning for open repair PRs (prefix: '${REPAIR_PREFIX}')..."

OPEN_PRS=$(gh pr list --repo "$REPO" \
  --state open \
  --json number,title,headRefName,statusCheckRollup \
  --jq ".[] | select(.headRefName | startswith(\"${REPAIR_PREFIX}\"))" \
  2>/dev/null || true)

if [ -z "$OPEN_PRS" ]; then
  echo "  ✅ No open repair PRs found."
else
  echo "  Found repair PRs — evaluating CI status..."

  echo "$OPEN_PRS" | python3 -c "
import sys, json, subprocess, os

dry_run = os.environ.get('DRY_RUN', 'false') == 'true'
repo    = os.environ.get('REPO', '')

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    try:
        pr = json.loads(line)
    except json.JSONDecodeError:
        continue

    number   = pr['number']
    title    = pr['title']
    branch   = pr['headRefName']
    checks   = pr.get('statusCheckRollup', []) or []

    # Determine if all checks passed
    all_pass = all(
        c.get('conclusion') in ('success', 'neutral', 'skipped')
        for c in checks
        if c.get('conclusion')
    )
    pending = any(c.get('status') in ('IN_PROGRESS', 'QUEUED') for c in checks)

    if pending:
        print(f'  ⏳ PR #{number} ({branch}) — CI still running, skipping.')
    elif all_pass or not checks:
        if dry_run:
            print(f'  [DRY-RUN] Would merge PR #{number}: {title}')
        else:
            print(f'  ✅ Merging PR #{number}: {title}')
            result = subprocess.run(
                ['gh', 'pr', 'merge', str(number), '--repo', repo,
                 '--squash', '--delete-branch', '--auto'],
                capture_output=True, text=True
            )
            if result.returncode == 0:
                print(f'  ✅ PR #{number} merged and branch deleted.')
            else:
                print(f'  ⚠ Failed to merge PR #{number}: {result.stderr.strip()}')
    else:
        failing = [c['name'] for c in checks if c.get('conclusion') == 'FAILURE']
        print(f'  ⚠ PR #{number} ({branch}) — CI failed on: {failing}. Skipping.')
" DRY_RUN="$DRY_RUN" REPO="$REPO"
fi

# ── 2. Remove stale repair branches ──────────────
echo ""
echo "▶ [2/3] Cleaning up merged/stale repair branches..."

STALE_BRANCHES=$(gh api "repos/${REPO}/branches" \
  --jq ".[] | select(.name | startswith(\"${REPAIR_PREFIX}\")) | .name" \
  2>/dev/null || true)

if [ -z "$STALE_BRANCHES" ]; then
  echo "  ✅ No stale repair branches found."
else
  echo "$STALE_BRANCHES" | while read -r BRANCH; do
    # Only delete branches whose PR is already merged
    PR_STATE=$(gh pr list --repo "$REPO" \
      --head "$BRANCH" --state merged \
      --json number --jq '.[0].number' 2>/dev/null || true)

    if [ -n "$PR_STATE" ]; then
      if $DRY_RUN; then
        echo "  [DRY-RUN] Would delete merged branch: $BRANCH"
      else
        gh api --method DELETE "repos/${REPO}/git/refs/heads/${BRANCH}" 2>/dev/null && \
          echo "  🗑 Deleted merged repair branch: $BRANCH" || \
          echo "  ℹ Branch $BRANCH already deleted or protected."
      fi
    else
      echo "  ℹ Branch $BRANCH has no merged PR — leaving untouched."
    fi
  done
fi

# ── 3. Verify main is stable ──────────────────────
echo ""
echo "▶ [3/3] Verifying main branch stability..."

MAIN_STATUS=$(gh api "repos/${REPO}/commits/main/check-runs" \
  --jq '[.check_runs[] | select(.conclusion != null)] |
        if length == 0 then "no-checks"
        elif all(.conclusion == "success" or .conclusion == "neutral" or .conclusion == "skipped") then "green"
        else "red"
        end' \
  2>/dev/null || echo "unknown")

case "$MAIN_STATUS" in
  green)      echo "  ✅ main is GREEN — all checks passing." ;;
  no-checks)  echo "  ℹ main has no completed check runs yet." ;;
  unknown)    echo "  ℹ Could not determine main status (API unavailable)." ;;
  *)          echo "  ⚠ main is NOT fully green — review failing checks." ;;
esac

echo ""
echo "═══════════════════════════════════════════════"
echo "  ✅ Branch sync complete${DRY_LABEL}."
echo "═══════════════════════════════════════════════"
