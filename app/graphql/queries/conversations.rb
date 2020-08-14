module Queries
  class Conversations < Queries::BaseQuery
    description "Get conversations for web widget"

    argument :website_token, String, required: true
    argument :token, String, required: true
    argument :page, Integer, required: false, default_value: 1
    argument :per, Integer, required: false, default_value: 20

    type Types::PaginatedConversationsType, null: true

    def resolve(website_token:, token:, page:, per:)
      set_web_widget(website_token)
      set_contact(token)
      @contact_inbox.conversations.where(
        inbox_id: auth_token_params(token)[:inbox_id]
      ).page(page).per(per).order(created_at: :desc)
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