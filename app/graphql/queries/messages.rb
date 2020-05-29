module Queries
  class Messages < Queries::BaseQuery
    description "Get messages for web widget"

    argument :website_token, String, required: true
    argument :token, String, required: true
    argument :uuid, String, required: true
    argument :page, Integer, required: false, default_value: 1
    argument :per, Integer, required: false, default_value: 20

    type Types::PaginatedMessagesType, null: true

    def resolve(website_token:, token:, page:, per:, uuid:)
      set_web_widget(website_token)
      set_contact(token)
      @contact_inbox.conversations.find_by(
        uuid: uuid
      ).messages.page(page).per(per).reorder(created_at: :desc)
    end

    private

    def set_web_widget(website_token)
      @web_widget = ::Channel::WebWidget.find_by!(website_token: website_token)
    end
  
    def auth_token_params(token)
      @auth_token_params ||= ::Widget::TokenService.new(token: token).decode_token
    end

    def set_contact(token)
      @contact_inbox = @web_widget.inbox.contact_inboxes.find_by(
        source_id: auth_token_params(token)[:source_id]
      )
      @contact = @contact_inbox.contact
    end
  end
end