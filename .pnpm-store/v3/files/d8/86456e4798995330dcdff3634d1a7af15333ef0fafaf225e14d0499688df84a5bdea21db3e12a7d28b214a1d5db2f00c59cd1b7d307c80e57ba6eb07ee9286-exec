#!/usr/bin/env bash

set -euo pipefail

INSTALL_PATH="${INSTALL_PATH:-./scripts/git-hook-pure.sh}"

mkdir -p "$(dirname "$INSTALL_PATH")"
curl -fsSL https://raw.githubusercontent.com/bolasblack/git-hook-pure/master/git-hook-pure.sh > "$INSTALL_PATH"
chmod u+x "$INSTALL_PATH"
"$INSTALL_PATH" install
