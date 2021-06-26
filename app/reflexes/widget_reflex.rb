class WidgetReflex < ApplicationReflex
  def open_code
    widget = current_account.web_widgets.first
    cable_ready.insert_adjacent_html(
      selector: "body",
      position: "beforeend",
      html: render(partial: "admin/inboxes/snippet", locals: { widget: widget }),
    ).broadcast

    cable_ready.dispatch_event(
      name: "modal:open",
    ).broadcast
  end
end
