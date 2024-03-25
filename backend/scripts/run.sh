#!/bin/sh

set -e

python manage.py wait_for_db
python manage.py migrate

PORT=${BACKEND_PORT:-80}

uwsgi --http 0.0.0.0:${PORT} --workers 4 --master --enable-threads --module app.wsgi
