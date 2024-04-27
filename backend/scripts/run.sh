#!/bin/sh

set -e

python manage.py wait_for_db
python manage.py migrate

PORT=${BACKEND_PORT:-80}

uvicorn app.asgi:application --host 0.0.0.0 --port ${PORT} --workers 4
