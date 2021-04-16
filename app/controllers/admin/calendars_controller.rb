class Admin::CalendarsController < Admin::BaseController
    def index
      session[:calendar_date] ||= Date.today.to_s
      date = Date.parse(session[:calendar_date])
      @calendar_events = CalendarEvent.where("start_time >= ? AND end_time <= ?", date.beginning_of_day, date.end_of_day)
    end
end