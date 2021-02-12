class Mutations::UnsecureConversation < Mutations::BaseMutation
  argument :conversation_id, ID, required: true

  field :conversation, Types::ConversationType, null: true

  def resolve(conversation_id:)
    set_web_widget
    set_token
    set_contact
    conversation = @contact.conversations.find_by(uuid: conversation_id)
    conversation.update!(secured: false)
    conversation.messages.where(secured: true).destroy_all

    {
      contact: conversation
    }
  end

  private

  def set_token
    @token = context[:token]
    @auth_token_params = if @token.present?
                           ::Widget::TokenService.new(token: @token).decode_token
                         else
                           {}
                         end
  end

  def set_contact
    @contact_inbox = @web_widget.inbox.contact_inboxes.find_by(
      source_id: @auth_token_params[:source_id]
    )
    @contact = @contact_inbox.contact
  end

  def set_web_widget
    @web_widget = context[:widget]
  end
end
