class UpdateGoogleCalendarJob < WebhookJob
  queue_as :default

  def perform(record)
    retries = 0
    begin
      return unless record.google_event_id.present?
      return unless record.invitee.settings.google_calendar_id.present?

      client = OauthClient.client
      client.update!(record.invitee.settings.google_calendar)

      service = Google::Apis::CalendarV3::CalendarService.new
      service.authorization = client

      event = service.get_event(record.invitee.settings.google_calendar_id, record.google_event_id)

      event.summary = record.calendar_event.title
      event.start = Google::Apis::CalendarV3::EventDateTime.new(date_time: record.calendar_event.start_time.strftime("%Y-%m-%dT%H:%M:%S%z"))
      event.end = Google::Apis::CalendarV3::EventDateTime.new(date_time: record.calendar_event.end_time.strftime("%Y-%m-%dT%H:%M:%S%z"))

      service.update_event(record.invitee.settings.google_calendar_id, event.id, event)
    rescue Google::Apis::AuthorizationError
      response = client.refresh!
      record.invitee.settings.update(google_calendar: record.invitee.settings.google_calendar.merge(response))
      if (retries += 1) <= 3
        puts "Retrying in #{retries} second(s)..."
        sleep(retries)
        retry
      else
        raise
      end
    end
  end
end
