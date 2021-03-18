class Admin::Channel::WebWidgetsController < Admin::BaseController
    def create
        @widget = current_account.web_widgets.build(web_widget_params)

        if @widget.save
            cable_ready[UserChannel].remove(
                selector: "#setup-widget"
            ).insert_adjecent_html(
                selector: "body",
                position: "beforeend",
                html: render(partial: "admin/inboxes/snippet", locals: { widget: @widget })
            )
            .broadcast_to(current_admin)
        else
            cable_ready[UserChannel]
                .inner_html(
                    selector: "#widget_new_form",
                    html: render(partial: "admin/inboxes/form", locals: { widget: @widget })
                )
                .broadcast_to(current_admin)
        end
    end

    private
    
    def web_widget_params
        params.require(:channel_web_widget).permit(:welcome_title, :welcome_tagline, :website_url, inbox_attributes: [:name, :account_id])
    end
end