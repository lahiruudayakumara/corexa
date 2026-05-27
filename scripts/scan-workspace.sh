#!/usr/bin/env bash
set -euo pipefail

TARGET_PATH="${1:-$(pwd)}"

echo "Scanning workspace at ${TARGET_PATH}"
pnpm --filter @corexa/cli dev scan "${TARGET_PATH}"
