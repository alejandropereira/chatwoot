class AssigneeReflex < ApplicationReflex
  def toggle
    event = element.signed[:event]
    agent = element.signed[:agent]

    if event.invitees.include?(agent)
      event.invitees.delete(agent)
    else
      event.invitees << agent
    end

    morph "#calendar_event", render(partial: "admin/calendars/event", locals: { event: event })
  end
end
