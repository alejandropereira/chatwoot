if defined?(DatabaseCleaner)
  # cleaning the database using database_cleaner
  DatabaseCleaner.strategy = :truncation
  DatabaseCleaner.clean
else
  logger.warn 'add database_cleaner or update cypress/app_commands/clean.rb'
  Conversation.delete_all if defined?(Conversation)
end

Rails.logger.info 'APPCLEANED' # used by log_fail.rb