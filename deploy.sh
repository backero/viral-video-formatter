#!/usr/bin/env bash
# Usage: bash deploy.sh   (run from project folder, Git Bash / WSL)
set -e
HOST=root@157.230.47.159
DOMAIN=formatter.backero.in
WEBROOT=/var/www/formatter

npm install
npm run build

ssh $HOST "mkdir -p $WEBROOT"
scp -r dist/* $HOST:$WEBROOT/

ssh $HOST "bash -s" <<REMOTE
set -e
if [ ! -f /etc/nginx/sites-available/formatter ]; then
cat > /etc/nginx/sites-available/formatter <<'NGINX'
server {
    listen 80;
    server_name $DOMAIN;
    root $WEBROOT;
    index index.html;
    location / { try_files \$uri /index.html; }
}
NGINX
ln -sf /etc/nginx/sites-available/formatter /etc/nginx/sites-enabled/formatter
nginx -t && systemctl reload nginx
certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m treyfaacc@gmail.com --redirect
fi
REMOTE

echo "Live: https://$DOMAIN"
