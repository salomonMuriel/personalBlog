#!/usr/bin/env bash
# Quiet build script - suppresses per-file/route output, shows errors and final summary only.
# Useful when running from Claude Code to avoid flooding context with 200KB of route listings.

set -eo pipefail

echo "=== Astro Build ==="
astro_output=$(npx astro build 2>&1) || {
    echo "$astro_output" | grep -E "ERROR|error" >&2
    exit 1
}
echo "$astro_output" | grep -E "\[build\]|\[vite\]" | grep -v "Skipping"

echo ""
echo "=== Jampack Optimization ==="
npx jampack ./dist --exclude "posts/**" 2>&1 | tail -20
