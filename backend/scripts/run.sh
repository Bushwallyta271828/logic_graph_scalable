#!/bin/sh

set -e

python manage.py wait_for_db

PORT=${BACKEND_PORT:-80}

uvicorn asgi:application --host 0.0.0.0 --port ${PORT} --workers 4
