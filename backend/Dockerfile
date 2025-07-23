# syntax=docker/dockerfile:1

ARG RUBY_VERSION=3.3.7
FROM ruby:${RUBY_VERSION}-slim AS base

# Set working directory
WORKDIR /rails

# Install base runtime dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      curl \
      libjemalloc2 \
      libvips \
      sqlite3 && \
    rm -rf /var/lib/apt/lists/*

# Set environment variables for production and bundler
ENV RAILS_ENV=production \
    BUNDLE_DEPLOYMENT=1 \
    BUNDLE_PATH=/usr/local/bundle \
    BUNDLE_WITHOUT=development:test

# --- Build stage ---
FROM base AS build

# Install build dependencies + Node.js & Yarn for assets
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential \
      git \
      pkg-config \
      libyaml-dev \
      curl \
      gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs yarn && \
    rm -rf /var/lib/apt/lists/*

# Copy Gemfiles and install gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Copy app source
COPY . .

# Precompile bootsnap cache for app code
RUN bundle exec bootsnap precompile app/ lib/

# Install JS dependencies
RUN yarn install --check-files

# Precompile assets with dummy secret key
RUN SECRET_KEY_BASE=dummysecret ./bin/rails assets:precompile

# --- Final stage ---
FROM base

# Copy gems from build
COPY --from=build /usr/local/bundle /usr/local/bundle

# Copy the app code
COPY --from=build /rails /rails

# Create non-root user and set ownership
RUN groupadd --system --gid 1000 rails && \
    useradd --uid 1000 --gid 1000 --create-home --shell /bin/bash rails && \
    chown -R rails:rails /rails/db /rails/log /rails/storage /rails/tmp

USER rails

# Entrypoint and default command
ENTRYPOINT ["/rails/bin/docker-entrypoint"]
EXPOSE 80
CMD ["./bin/thrust", "./bin/rails", "server"]
