Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '*',
      headers: :any,
      methods: [:get, :post, :patch, :put, :options],
      expose: ['access-token', 'expiry', 'token-type', 'uid', 'client']
  end
end
