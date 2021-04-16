class CalendarEventReflex < ApplicationReflex
    def new(start_time, end_time)
        @event = CalendarEvent.new(start_time: start_time, end_time: end_time)
        cable_ready.insert_adjacent_html(
            selector: "#calendar_events",
            html: render(partial: "admin/calendar_events/new", assigns: { event: @event })
        ).broadcast
        cable_ready.dispatch_event(
          name: "modal:open"
        ).broadcast
        morph :nothing
    end

    def update(id, start_time, end_time)
      @event = CalendarEvent.find(id)
      @event.update(start_time: start_time, end_time: end_time)
      morph :nothing
    end

    def create
      @event = CalendarEvent.new(calendar_event_params)

      if @event.save
        cable_ready.dispatch_event(
          name: "event:added",
          detail: {
            event: @event
          }
        ).broadcast
      else
        cable_ready.replace(
          selector: dom_id(@event),
          html: render(partial: "admin/calendar_events/form", locals: { event: @event })
      ).broadcast
    end
    
    morph :nothing
  end

  def change_date(new_date, timezone = "America/Guatemala")
    Time.zone = timezone
    session[:calendar_date] = new_date
    date = Time.zone.parse(session[:calendar_date])
    events = CalendarEvent.where("start_time >= ? AND end_time <= ?", date.beginning_of_day, date.end_of_day)
    cable_ready.inner_html(
      selector: "#calendar",
      html: render(partial: "admin/calendars/calendar", locals: { events: events, current_date: new_date })
    ).broadcast
    morph :nothing
  end

  private

  def calendar_event_params
    params.require(:calendar_event).permit(:title, :start_time, :end_time).merge(account: current_account)
  end
end