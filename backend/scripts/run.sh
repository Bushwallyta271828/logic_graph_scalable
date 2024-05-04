#!/bin/sh

set -e

python manage.py wait_for_db

if [ "${DB_REBUILD}" == "true" ]; then
    echo "Rebuilding the database..."
    python manage.py reset_db --noinput
    python manage.py makemigrations
    python manage.py migrate
    echo "Database rebuilt."
fi

# Run sqldiff for all apps and capture the output
OUTPUT=$(python manage.py sqldiff --all-apps)

if [[ "$OUTPUT" == *"No differences"* ]]; then
    echo "Database schema matches the models. Continuing execution..."
    PORT=${BACKEND_PORT:-80}
    uvicorn asgi:application --host 0.0.0.0 --port ${PORT} --workers 4
else
    echo "Schema differences detected. Please resolve the following issues:"
    echo "$OUTPUT"
    exit 1
fi
