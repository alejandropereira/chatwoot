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
    client = OauthClient.client
    client.update!(settings.google_calendar)

    service = Google::Apis::CalendarV3::CalendarService.new
    service.authorization = client

    Rails.cache.fetch(['google_calendars', settings.id], expires: 1.hour) do
      service.list_calendar_lists
    end
  rescue Signet::AuthorizationError, Google::Apis::AuthorizationError => e
    response = client.refresh!
    settings.update(google_calendar: settings.google_calendar.merge(response))
    retry
  end

  def settings
    current_admin.current_settings
  end
end
