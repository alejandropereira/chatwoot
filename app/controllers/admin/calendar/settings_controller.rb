class Admin::Calendar::SettingsController < Admin::BaseController
  def show
    if session[:authorization].present?
      settings.update(google_calendar: session[:authorization])
      session[:authorization] = nil
    end
    @settings = settings
    @calendars = settings.google_calendar_access_token.present? ? calendars : OpenStruct.new(items: [])
  end

  private

  def calendars
    begin
      client = Signet::OAuth2::Client.new(client_options)
      client.update!(settings.google_calendar)

      service = Google::Apis::CalendarV3::CalendarService.new
      service.authorization = client

      Rails.cache.fetch(["google_calendars", settings.id], :expires => 1.hour) do
        service.list_calendar_lists
      end
    rescue Signet::AuthorizationError, Google::Apis::AuthorizationError => e
      response = client.refresh!
      settings.update(google_calendar: settings.google_calendar.merge(response))
      retry
    end
  end

  def settings
    current_admin.current_settings
  end

  def client_options
    {
      client_id: Rails.application.secrets.google_client_id,
      client_secret: Rails.application.secrets.google_client_secret,
      authorization_uri: "https://accounts.google.com/o/oauth2/auth",
      token_credential_uri: "https://accounts.google.com/o/oauth2/token",
      scope: Google::Apis::CalendarV3::AUTH_CALENDAR,
      redirect_uri: callback_url,
      state: params[:redirect_to],
    }
  end
end
