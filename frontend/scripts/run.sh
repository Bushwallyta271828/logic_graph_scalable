#!/bin/sh

set -e

env > .env.local

npx next start -p $FRONTEND_PORT
