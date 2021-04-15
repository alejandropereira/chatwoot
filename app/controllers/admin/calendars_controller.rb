class Admin::CalendarsController < Admin::BaseController
    def index
        @calendar_events = CalendarEvent.all
    end
end