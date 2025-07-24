#!/bin/bash
set -e

# Run migrations
bundle exec rails db:migrate
# Run seeds
bundle exec rails db:seed

# Then exec the container CMD
exec "$@"
