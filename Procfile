web: bin/rails server -p $PORT -b 0.0.0.0 -e $RAILS_ENV
worker: bundle exec sidekiq -C config/sidekiq.yml
release: bundle exec rails db:migrate
