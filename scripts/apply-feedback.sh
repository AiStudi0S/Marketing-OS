#!/usr/bin/env bash
# apply-feedback.sh — Collect PR review comments via GitHub CLI and log them for
# deterministic triage.  Automated code edits are intentionally out of scope to
# avoid non-deterministic patches; this script surfaces the feedback so that the
# SWARM repair agent (or a human) can apply targeted, minimal diffs.
#
# Usage: bash scripts/apply-feedback.sh --pr <PR_NUMBER> [--repo <owner/repo>]
# Requires: gh (GitHub CLI), jq
set -euo pipefail

PR_NUMBER=""
REPO="${REPO:-}"

# ── Argument parsing ──────────────────────────────
while [[ $# -gt 0 ]]; do
  case "$1" in
    --pr)   PR_NUMBER="$2"; shift 2 ;;
    --repo) REPO="$2";      shift 2 ;;
    *)      echo "Unknown argument: $1"; exit 1 ;;
  esac
done

if [ -z "$PR_NUMBER" ]; then
  echo "Usage: $0 --pr <PR_NUMBER> [--repo <owner/repo>]"
  exit 1
fi

if ! command -v gh &>/dev/null; then
  echo "Error: gh (GitHub CLI) is required but not installed."
  exit 1
fi

# Resolve repo from git remote when not explicitly provided
if [ -z "$REPO" ]; then
  REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || true)
  if [ -z "$REPO" ]; then
    echo "Error: Could not determine repository. Pass --repo <owner/repo>."
    exit 1
  fi
fi

echo "═══════════════════════════════════════════════"
echo "  SWARM Feedback Collector"
echo "  Repo: $REPO  •  PR: #$PR_NUMBER"
echo "  $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo "═══════════════════════════════════════════════"

# ── Fetch review comments ─────────────────────────
echo ""
echo "▶ Fetching review comments from PR #$PR_NUMBER..."

COMMENTS=$(gh api \
  "repos/${REPO}/pulls/${PR_NUMBER}/comments" \
  --jq '.[] | {id: .id, path: .path, line: .line, body: .body, user: .user.login}' \
  2>/dev/null || true)

REVIEW_COMMENTS=$(gh api \
  "repos/${REPO}/pulls/${PR_NUMBER}/reviews" \
  --jq '.[] | select(.state != "APPROVED") | {id: .id, state: .state, body: .body, user: .user.login}' \
  2>/dev/null || true)

# ── Display comments ──────────────────────────────
if [ -z "$COMMENTS" ] && [ -z "$REVIEW_COMMENTS" ]; then
  echo "  ✅ No unresolved review comments found on PR #$PR_NUMBER."
  exit 0
fi

FEEDBACK_FILE="/tmp/swarm-feedback-pr${PR_NUMBER}.md"
{
  echo "# SWARM Feedback — PR #${PR_NUMBER}"
  echo "_Generated: $(date -u +"%Y-%m-%dT%H:%M:%SZ")_"
  echo ""

  if [ -n "$COMMENTS" ]; then
    echo "## Inline Code Comments"
    echo ""
    echo "$COMMENTS" | python3 -c "
import sys, json

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    try:
        c = json.loads(line)
        path = c.get('path', 'unknown')
        lineno = c.get('line', '?')
        body = c.get('body', '')
        user = c.get('user', 'unknown')
        print(f'### \`{path}\` line {lineno}')
        print(f'**{user}**: {body}')
        print()
    except json.JSONDecodeError:
        pass
" 2>/dev/null || echo "$COMMENTS"
  fi

  if [ -n "$REVIEW_COMMENTS" ]; then
    echo "## Review-Level Comments"
    echo ""
    echo "$REVIEW_COMMENTS" | python3 -c "
import sys, json

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    try:
        c = json.loads(line)
        state = c.get('state', '?')
        body = c.get('body', '')
        user = c.get('user', 'unknown')
        if body:
            print(f'**{user}** ({state}): {body}')
            print()
    except json.JSONDecodeError:
        pass
" 2>/dev/null || echo "$REVIEW_COMMENTS"
  fi

  echo "---"
  echo "_Action: Review each item above and apply minimal, deterministic fixes._"
  echo "_Protected artifacts (docs/, ARCHITECTURE.md, prompts/) must remain untouched._"
} > "$FEEDBACK_FILE"

echo ""
echo "  ✅ Feedback written to: $FEEDBACK_FILE"
echo ""
cat "$FEEDBACK_FILE"
echo ""
echo "═══════════════════════════════════════════════"
echo "  Next steps:"
echo "  1. Review the feedback items above."
echo "  2. Apply minimal diffs — do not modify protected artifacts."
echo "  3. Push fixes to the repair branch and re-run CI."
echo "═══════════════════════════════════════════════"
