#!/usr/bin/env bash
# Build sin el listado de rutas. Útil dentro de Claude Code, donde el
# volcado completo se come el contexto sin aportar nada.

set -eo pipefail

echo "=== Astro build ==="
salida=$(npx astro build 2>&1) || {
    echo "$salida" | grep -Ei "error" >&2
    exit 1
}
echo "$salida" | grep -E "\[build\]|\[vite\]|\[@astrojs" | grep -v "Skipping"
