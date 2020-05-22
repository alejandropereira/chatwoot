module Queries
  class WebWidget < Queries::BaseQuery
    description "Get web widget by web_token and generate auth token"

    argument :website_token, String, required: true
    argument :auth_token, String, required: false

    type Types::WidgetPayload, null: false

    def resolve(website_token:, auth_token: nil)
      set_web_widget(website_token)
      set_token(auth_token)
      set_contact
      build_contact

      {
        widget: @web_widget,
        token: @token
      }
    end

    private

    def set_web_widget(website_token)
      @web_widget = ::Channel::WebWidget.find_by!(website_token: website_token)
    end
  
    def set_token(token)
      @token = token
      @auth_token_params = if @token.present?
                             ::Widget::TokenService.new(token: @token).decode_token
                           else
                             {}
                           end
    end
  
    def set_contact
      return if @auth_token_params[:source_id].nil?
  
      contact_inbox = ::ContactInbox.find_by(
        inbox_id: @web_widget.inbox.id,
        source_id: @auth_token_params[:source_id]
      )
  
      @contact = contact_inbox ? contact_inbox.contact : nil
    end
  
    def build_contact
      return if @contact.present?
  
      contact_inbox = @web_widget.create_contact_inbox
      @contact = contact_inbox.contact
  
      payload = { source_id: contact_inbox.source_id, inbox_id: @web_widget.inbox.id }
      @token = ::Widget::TokenService.new(payload: payload).generate_token
    end
  end
end