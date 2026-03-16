#!/usr/bin/env bash
# audit-repo.sh — Detect failing CI, outdated dependencies, and misconfigured workflows.
#
# Usage: bash scripts/audit-repo.sh [--repo <owner/repo>]
# Requires: gh (GitHub CLI), node/npm, jq
set -euo pipefail

REPO="${REPO:-$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "")}"
EXIT_CODE=0

echo "═══════════════════════════════════════════════"
echo "  SWARM Repo Audit — $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo "  Repo: ${REPO:-local}"
echo "═══════════════════════════════════════════════"

# ── 1. CI health ─────────────────────────────────
echo ""
echo "▶ [1/4] CI health check"
if [ -n "$REPO" ] && command -v gh &>/dev/null; then
  FAILED_RUNS=$(gh run list --repo "$REPO" --limit 20 --json conclusion,name,headBranch \
    --jq '.[] | select(.conclusion == "failure") | "\(.name) on \(.headBranch)"' 2>/dev/null || true)
  if [ -n "$FAILED_RUNS" ]; then
    echo "  ⚠ Failed workflow runs:"
    echo "$FAILED_RUNS" | sed 's/^/    • /'
    EXIT_CODE=1
  else
    echo "  ✅ No recent CI failures detected."
  fi
else
  echo "  ℹ gh CLI not available or REPO not set — skipping remote CI check."
fi

# ── 2. Outdated npm dependencies ─────────────────
echo ""
echo "▶ [2/4] Outdated npm dependencies"
if [ -f "package.json" ]; then
  OUTDATED=$(npm outdated --json 2>/dev/null || true)
  if [ -n "$OUTDATED" ] && [ "$OUTDATED" != "{}" ]; then
    echo "  ⚠ Outdated packages:"
    echo "$OUTDATED" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for pkg, info in data.items():
    print(f'    • {pkg}: {info.get(\"current\",\"?\")} → {info.get(\"latest\",\"?\")}')
" 2>/dev/null || echo "$OUTDATED" | sed 's/^/    /'
    EXIT_CODE=1
  else
    echo "  ✅ All npm packages are up to date."
  fi

  # npm audit
  echo ""
  echo "▶ [2b/4] npm security audit"
  AUDIT_OUTPUT=$(npm audit --json 2>/dev/null || true)
  VULN_COUNT=$(echo "$AUDIT_OUTPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    total = d.get('metadata',{}).get('vulnerabilities',{})
    print(sum(total.values()))
except Exception:
    print(0)
" 2>/dev/null || echo "0")
  if [ "$VULN_COUNT" -gt 0 ] 2>/dev/null; then
    echo "  ⚠ $VULN_COUNT npm vulnerabilities found. Run: npm audit"
    EXIT_CODE=1
  else
    echo "  ✅ No npm vulnerabilities found."
  fi
else
  echo "  ℹ No package.json — skipping npm checks."
fi

# ── 3. Python dependencies ───────────────────────
echo ""
echo "▶ [3/4] Python dependency check"
if [ -f "requirements.txt" ]; then
  if command -v pip &>/dev/null; then
    OUTDATED_PY=$(pip list --outdated --format=columns 2>/dev/null | tail -n +3 || true)
    if [ -n "$OUTDATED_PY" ]; then
      echo "  ⚠ Outdated Python packages:"
      echo "$OUTDATED_PY" | sed 's/^/    • /'
      EXIT_CODE=1
    else
      echo "  ✅ All Python packages are up to date."
    fi
  else
    echo "  ℹ pip not available — skipping Python check."
  fi
else
  echo "  ℹ No requirements.txt — skipping Python checks."
fi

# ── 4. Workflow configuration check ──────────────
echo ""
echo "▶ [4/4] Workflow configuration check"
WORKFLOW_DIR=".github/workflows"
if [ -d "$WORKFLOW_DIR" ]; then
  WORKFLOW_ERRORS=0
  for YML in "$WORKFLOW_DIR"/*.yml "$WORKFLOW_DIR"/*.yaml; do
    [ -f "$YML" ] || continue
    # Basic YAML syntax check using Python
    python3 -c "
import sys
try:
    import yaml
except ImportError:
    print('  ℹ PyYAML not installed — skipping YAML syntax check. Install with: pip install PyYAML')
    sys.exit(0)
try:
    with open('$YML') as f:
        yaml.safe_load(f)
    print('  ✅ $YML — valid YAML')
except yaml.YAMLError as e:
    print(f'  ⚠ $YML — YAML error: {e}', file=sys.stderr)
    sys.exit(1)
" 2>/dev/null || { echo "  ⚠ $YML has YAML syntax errors."; WORKFLOW_ERRORS=1; EXIT_CODE=1; }
  done
  [ "$WORKFLOW_ERRORS" -eq 0 ] && echo "  ✅ All workflow files have valid YAML syntax."
else
  echo "  ℹ No .github/workflows directory found."
fi

echo ""
echo "═══════════════════════════════════════════════"
if [ "$EXIT_CODE" -eq 0 ]; then
  echo "  ✅ AUDIT COMPLETE — Repository is GREEN"
else
  echo "  ⚠ AUDIT COMPLETE — Issues detected (see above)"
fi
echo "═══════════════════════════════════════════════"
exit "$EXIT_CODE"
