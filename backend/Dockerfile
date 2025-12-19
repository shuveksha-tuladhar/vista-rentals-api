# syntax=docker/dockerfile:1
FROM ruby:3.2.2-slim-bullseye

# Set working directory
WORKDIR /app

# Install system dependencies + jemalloc for memory optimization
RUN apt-get update -qq && apt-get install --no-install-recommends -y \
  build-essential \
  libpq-dev \
  nodejs \
  yarn \
  curl \
  libvips \
  libsqlite3-dev \
  libyaml-dev \
  libjemalloc2 \
  && rm -rf /var/lib/apt/lists/*

# Set environment variables with memory optimizations
ENV RAILS_ENV=production \
    BUNDLE_DEPLOYMENT=true \
    BUNDLE_PATH=/usr/local/bundle \
    BUNDLE_WITHOUT="development:test" \
    MALLOC_CONF="dirty_decay_ms:1000,muzzy_decay_ms:1000,narenas:1" \
    RAILS_MAX_THREADS=1 \
    MALLOC_ARENA_MAX=2 \
    RUBY_GC_HEAP_GROWTH_FACTOR=1.1 \
    RUBY_GC_HEAP_INIT_SLOTS=10000 \
    RUBY_GC_HEAP_FREE_SLOTS=2000 \
    RUBY_GC_MALLOC_LIMIT=8000000 \
    RUBY_GC_OLDMALLOC_LIMIT=8000000 \
    DISABLE_SPRING=1

# Install gems using cached layer
COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 4 --retry 3

# Find and set jemalloc path dynamically
RUN JEMALLOC_PATH=$(find /usr/lib -name "libjemalloc.so.2" 2>/dev/null | head -n 1) && \
    if [ -n "$JEMALLOC_PATH" ]; then \
      echo "export LD_PRELOAD=$JEMALLOC_PATH" >> /etc/profile.d/jemalloc.sh && \
      chmod +x /etc/profile.d/jemalloc.sh; \
    fi

# Copy the rest of the application
COPY . .

# Copy entrypoint script
COPY entrypoint.sh /app/entrypoint.sh

# Precompile assets using a dummy secret (safe for build)
RUN BOOTSNAP_CACHE_DIR=/tmp SECRET_KEY_BASE=dummytoken CORS_ORIGIN=http://localhost:5173 bundle exec rails assets:precompile

# Remove unnecessary gems and cache to reduce image size
RUN bundle clean --force && \
    rm -rf /usr/local/bundle/cache && \
    rm -rf /app/tmp/cache && \
    rm -rf /app/tmp/bootsnap* && \
    find /usr/local/bundle -name '*.md' -delete && \
    find /usr/local/bundle -name '*.rdoc' -delete

# Create a non-root user for security
RUN groupadd --system app && useradd --system --create-home --gid app appuser
RUN chown -R appuser:app /app
RUN chmod +x entrypoint.sh
USER appuser

ENTRYPOINT ["/app/entrypoint.sh"]

# Expose port for Render
EXPOSE 3000

# Environment variables that must be set at runtime
# Example: docker run -e SECRET_KEY_BASE=your_key -e CORS_ORIGIN=http://localhost:5173 vista-rentals-api
ENV SECRET_KEY_BASE="" \
    CORS_ORIGIN=""

# Start the Rails server with jemalloc if available
CMD ["sh", "-c", ". /etc/profile.d/jemalloc.sh 2>/dev/null || true && bundle exec rails server -b 0.0.0.0 -p 3000"]