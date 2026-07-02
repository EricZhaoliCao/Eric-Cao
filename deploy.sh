#!/bin/bash
# Deploy www.erictsao.cn — build the Vite site and rsync the static bundle to
# the server, where nginx serves /home/ubuntu/www-home directly (no restart).
#
#   research.erictsao.cn = eLove factor portal (separate service, untouched here)
#   www.erictsao.cn      = this personal site (static files in www-home)
#
# Usage:  bash deploy.sh
set -e

SERVER="ubuntu@124.223.115.108"
REMOTE_DIR="/home/ubuntu/www-home"
cd "$(dirname "$0")"

echo "==> building"
if command -v pnpm >/dev/null 2>&1; then
  pnpm build
else
  ./node_modules/.bin/vite build   # no global pnpm: use the local vite install
fi

echo "==> backing up current live site"
ssh "$SERVER" 'ts=$(date +%Y%m%d-%H%M%S); tar czf ~/www-home-backup-$ts.tar.gz -C /home/ubuntu www-home && echo "  backup: ~/www-home-backup-$ts.tar.gz"'

echo "==> syncing dist/public -> $REMOTE_DIR"
rsync -az --delete dist/public/ "$SERVER:$REMOTE_DIR/"

echo "==> done. verifying"
curl -s https://www.erictsao.cn/ | grep -iE "<title>" || true
echo "deployed: $(date '+%F %T')"
