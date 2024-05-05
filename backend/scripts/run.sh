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

# Run the makemigrations command with --dry-run to check for changes
OUTPUT=$(python manage.py makemigrations --dry-run)

# Search for the string "No changes detected"
if echo "$OUTPUT" | grep -q "No changes detected"; then
    echo "Models and database schema are in sync."
else
    echo "Error: Models and database schema are out of sync!"
    echo "$OUTPUT"
    exit 1
fi

PORT=${BACKEND_PORT:-80}

uvicorn asgi:application --host 0.0.0.0 --port ${PORT} --workers 4
