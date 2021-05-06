class GoogleCalendarReflex < ApplicationReflex
  def update_calendar
    calendar_id, calendar_name = element.value.split(":")
    setting = current_user.settings.find_by(account: current_account)
    setting.google_calendar_id = calendar_id
    setting.google_calendar_name = calendar_name
    setting.save!

    cable_ready.inner_html(
      selector: "#flash-messages",
      html: render(partial: "admin/shared/flash_message", locals: { content: "Google calendar updated successfully." }),
    ).broadcast
  end

  def reset_calendar
    setting = current_user.settings.find_by(account: current_account)
    setting.google_calendar_id = nil
    setting.google_calendar_name = nil
    setting.save!
  end
end
