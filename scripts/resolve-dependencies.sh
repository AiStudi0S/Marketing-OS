#!/usr/bin/env bash
# resolve-dependencies.sh — Automatically update and fix dependency conflicts.
#
# Supports:
#   • Node.js  — npm outdated → npm update (with optional lock-file refresh)
#   • Python   — pip-compile (pip-tools) or pip install -U
#
# Usage: bash scripts/resolve-dependencies.sh [--python] [--node] [--all]
# Defaults to --all when no flag is passed.
set -euo pipefail

DO_NODE=false
DO_PYTHON=false

if [ $# -eq 0 ]; then
  DO_NODE=true
  DO_PYTHON=true
fi

for ARG in "$@"; do
  case "$ARG" in
    --node)   DO_NODE=true ;;
    --python) DO_PYTHON=true ;;
    --all)    DO_NODE=true; DO_PYTHON=true ;;
    *)        echo "Unknown flag: $ARG"; exit 1 ;;
  esac
done

echo "═══════════════════════════════════════════════"
echo "  SWARM Dependency Resolver — $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo "═══════════════════════════════════════════════"

# ── Node.js ───────────────────────────────────────
if $DO_NODE && [ -f "package.json" ]; then
  echo ""
  echo "▶ [Node.js] Checking for outdated packages..."
  OUTDATED=$(npm outdated --json 2>/dev/null || true)

  if [ -z "$OUTDATED" ] || [ "$OUTDATED" = "{}" ]; then
    echo "  ✅ All npm packages are up to date — nothing to do."
  else
    echo "  ⚠ Outdated packages detected — running npm update..."
    npm update
    echo "  ✅ npm update completed."

    # Re-check for packages that still need manual version pins
    STILL_OUTDATED=$(npm outdated --json 2>/dev/null || true)
    if [ -n "$STILL_OUTDATED" ] && [ "$STILL_OUTDATED" != "{}" ]; then
      echo ""
      echo "  ℹ The following packages could not be automatically updated"
      echo "  (likely due to major-version semver constraints):"
      echo "$STILL_OUTDATED" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for pkg, info in data.items():
    wanted  = info.get('wanted', '?')
    latest  = info.get('latest', '?')
    current = info.get('current', '?')
    print(f'    • {pkg}: current={current}, wanted={wanted}, latest={latest}')
" 2>/dev/null || echo "$STILL_OUTDATED"
      echo ""
      echo "  To pin a package to its latest major version, run:"
      echo "    npm install <package>@latest"
    fi
  fi

  # Regenerate lock file for deterministic installs
  echo ""
  echo "  Refreshing package-lock.json..."
  npm install --package-lock-only
  echo "  ✅ package-lock.json refreshed."
fi

# ── Python ────────────────────────────────────────
if $DO_PYTHON && [ -f "requirements.txt" ]; then
  echo ""
  echo "▶ [Python] Checking for outdated packages..."

  if command -v pip-compile &>/dev/null; then
    # Use pip-tools for deterministic resolution
    echo "  pip-tools detected — running pip-compile..."
    if [ -f "requirements.in" ]; then
      pip-compile --upgrade requirements.in
      echo "  ✅ requirements.txt regenerated via pip-compile."
    else
      echo "  ℹ No requirements.in found — running pip-compile on requirements.txt..."
      pip-compile --upgrade requirements.txt
      echo "  ✅ requirements.txt re-pinned via pip-compile."
    fi
  elif command -v pip &>/dev/null; then
    echo "  pip-tools not available — using pip install -U..."
    # Upgrade all packages listed in requirements.txt
    pip install --upgrade -r requirements.txt
    # Freeze only packages originally listed in requirements.txt
    pip freeze -r requirements.txt > requirements.txt.new && mv requirements.txt.new requirements.txt
    echo "  ✅ requirements.txt updated with pip freeze -r (pinned to original packages only)."
  else
    echo "  ⚠ pip not available — skipping Python dependency resolution."
  fi
fi

echo ""
echo "═══════════════════════════════════════════════"
echo "  ✅ Dependency resolution complete."
echo "═══════════════════════════════════════════════"
