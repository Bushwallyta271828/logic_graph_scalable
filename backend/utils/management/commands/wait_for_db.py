"""
Django command to wait for the database to be available.
"""
import os, time

from psycopg2 import OperationalError as Psycopg2OpError

from django.db.utils import OperationalError
from django.core.management.base import BaseCommand
import redis

class Command(BaseCommand):
    """Django command to wait for database."""

    def handle(self, *args, **options):
        """Entrypoint for command."""
        self.stdout.write("Waiting for database...")
        db_up = False
        while db_up is False:
            try:
                self.check(databases=['default'])
                db_up = True
            except (Psycopg2OpError, OperationalError):
                self.stdout.write('Database unavailable, waiting 1 second...')
                time.sleep(1)
        self.stdout.write(self.style.SUCCESS('Database ready!'))

        self.stdout.write('Waiting for Redis...')
        redis_conn = None
        while not redis_conn:
            try:
                redis_conn = redis.Redis(host=os.environ.get('REDIS_HOST'), port=os.environ.get('REDIS_PORT'))
                redis_conn.ping()
            except redis.exceptions.ConnectionError:
                self.stdout.write('Redis unavailable, waiting 1 second...')
                time.sleep(1)
        self.stdout.write('Redis is available!')
