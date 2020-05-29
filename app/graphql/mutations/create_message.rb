class Mutations::CreateMessage < Mutations::BaseMutation
  argument :website_token, String, required: true
  argument :token, String, required: true
  argument :content, String, required: false

  field :message, Types::MessageType, null: true

  def resolve(website_token:, token:, content:)
    set_web_widget(website_token)
    set_token(token)
    set_contact
    message = conversation.messages.new(message_params(content))
    message.save

    {
      message: message,
    }
  end

  private

  def message_params(content)
    {
      account_id: conversation.account_id,
      contact_id: @contact.id,
      content: content,
      inbox_id: conversation.inbox_id,
      message_type: :incoming
    }
  end

  def conversation
    @conversation ||= @contact_inbox.conversations.where(
      inbox_id: @auth_token_params[:inbox_id]
    ).last
  end

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

    @contact_inbox = ::ContactInbox.find_by(
      inbox_id: @web_widget.inbox.id,
      source_id: @auth_token_params[:source_id]
    )

    @contact = @contact_inbox ? @contact_inbox.contact : nil
  end
end