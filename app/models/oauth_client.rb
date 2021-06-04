class OauthClient
  class << self
    def client
      @client ||= Signet::OAuth2::Client.new(client_options)
    end

    private

    def client_options
      {
        client_id: Rails.application.credentials.google[:client_id],
        client_secret: Rails.application.credentials.google[:client_secret],
        authorization_uri: "https://accounts.google.com/o/oauth2/auth",
        token_credential_uri: "https://accounts.google.com/o/oauth2/token",
        scope: Google::Apis::CalendarV3::AUTH_CALENDAR,
        access_type: "offline",
      }
    end
  end
end