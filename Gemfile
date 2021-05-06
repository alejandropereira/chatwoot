source "https://rubygems.org"

ruby "2.7.1"

##-- base gems for rails --##
gem "rack-cors", require: "rack/cors"
gem "rails", "~> 6.0.3.6"
# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

##-- rails application helper gems --##
gem "acts-as-taggable-on"
gem "attr_extras"
gem "browser"
gem "hashie"
gem "jbuilder"
gem "kaminari"
gem "pagy", "~> 3.5"
gem "responders"
gem "rest-client"
gem "telephone_number"
gem "time_diff"
gem "tzinfo-data"
gem "valid_email2"
gem "friendly_id", "~> 5.4.0"
# compress javascript config.assets.js_compressor
gem "uglifier"
##-- used for single column multiple binary flags in notification settings/feature flagging --##
gem "flag_shih_tzu"
# Random name generator for user names
gem "haikunator"
# Template parsing safetly
gem "liquid"

##-- for active storage --##
gem "aws-sdk-s3", require: false
gem "azure-storage-blob", require: false
gem "google-cloud-storage", require: false
gem "mini_magick"
gem "image_processing"

##-- subscriptions --##
gem "pay", "~> 2.0"
gem "stripe", "< 6.0", ">= 2.8"
gem "stripe_event", "~> 2.3"
gem "receipts", "~> 1.0.0"

##-- gems for database --#
gem "groupdate"
gem "pg"
gem "redis", ">= 4.0", :require => ["redis", "redis/connection/hiredis"]
gem "hiredis"
gem "redis-namespace"
gem "redis-rack-cache"

##--- gems for server & infra configuration ---##
gem "dotenv-rails"
gem "foreman"
gem "puma"
gem "webpacker"

##--- gems for authentication & authorization ---##
gem "devise"
gem "devise_token_auth"
# authorization
gem "jwt"
gem "pundit"
# super admin
gem "administrate"

#grapqhl
gem "graphql", "~> 1.10", ">= 1.10.9"
gem "apollo_upload_server", "2.0.1"
gem "graphiql-rails", group: :development

##--- gems for pubsub service ---##
# https://karolgalanciak.com/blog/2019/11/30/from-activerecord-callbacks-to-publish-slash-subscribe-pattern-and-event-driven-design/
gem "wisper", "2.0.0"

##--- gems for channels ---##
gem "facebook-messenger"
gem "telegram-bot-ruby"
gem "twilio-ruby", "~> 5.32.0"
# twitty will handle subscription of twitter account events
# gem 'twitty', git: 'https://github.com/chatwoot/twitty'
gem "twitty"
# facebook client
gem "koala"
# slack client
gem "slack-ruby-client"

##--- gems for debugging and error reporting ---##
# static analysis
gem "brakeman"
gem "scout_apm"
gem "sentry-raven"

##-- background job processing --##
gem "sidekiq"
gem "sidekiq-failures"

##-- Push notification service --##
gem "fcm"
gem "webpush"

##-- A framework for building reusable, testable & encapsulated view components --##
gem "view_component", "~> 2.28", require: "view_component/engine"

gem "simple_form"
gem "simple_form-tailwind"

gem "acts_as_tenant"
gem "google-api-client", require: "google/apis/calendar_v3"

group :development do
  gem "annotate"
  gem "bullet"
  gem "letter_opener"
  gem "web-console"
  gem "spring-commands-rspec"
  gem "prettier"
  gem "guard-livereload", "~> 2.5", require: false
  gem "rack-livereload"
  gem "rack-mini-profiler"

  # used in swagger build
  gem "json_refs"
end

group :test do
  gem "cypress-on-rails", "~> 1.0"
  gem "database_cleaner"
  gem "capybara"
  gem "webdrivers"
  gem "magic_test"
  gem "capybara-email"
  gem "launchy"
end

group :development, :test do
  # locking until https://github.com/codeclimate/test-reporter/issues/418 is resolved
  gem "action-cable-testing"
  gem "bundle-audit", require: false
  gem "byebug", platform: :mri
  gem "factory_bot_rails"
  gem "faker"
  gem "listen"
  gem "mock_redis"
  gem "pry-rails"
  gem "rspec-rails", "~> 4.0.0.beta2"
  gem "rubocop", require: false
  gem "rubocop-performance", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-rspec", require: false
  gem "scss_lint", require: false
  gem "seed_dump"
  gem "shoulda-matchers"
  gem "simplecov", "0.17.1", require: false
  gem "spring"
  gem "spring-watcher-listen"
  gem "webmock"
  gem "database_cleaner-active_record"
end

gem "stimulus_reflex", "~> 3.4"
gem "futurism"
