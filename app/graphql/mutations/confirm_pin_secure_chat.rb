class Mutations::ConfirmPinSecureChat < Mutations::BaseMutation
  argument :conversation_id, ID, required: true
  argument :verification_pin, String, required: true

  field :conversation, Types::ConversationType, null: true

  def resolve(verification_pin:, conversation_id:)
    set_web_widget
    set_token
    set_contact

    raise GraphQL::ExecutionError, "Can't continue with this query #{verification_pin}" unless @contact.verification_pins.last.check_pin(verification_pin)

    conversation = @contact.conversations.find_by(uuid: conversation_id)
    conversation.update!(secured: true)

    {
      conversation: conversation
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

  def update_contact(email)
    @account = @web_widget.account
    contact_with_email = @account.contacts.find_by(email: email)
    if contact_with_email
      @contact = ::ContactMergeAction.new(
        account: @account,
        base_contact: contact_with_email,
        mergee_contact: @contact
      ).perform
    else
      @contact.update!(
        email: email
      )
    end
  end

  def set_web_widget
    @web_widget = context[:widget]
  end
end