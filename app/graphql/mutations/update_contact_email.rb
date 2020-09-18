class Mutations::UpdateContactEmail < Mutations::BaseMutation
  argument :website_token, String, required: true
  argument :token, String, required: true
  argument :message_id, ID, required: true
  argument :email, String, required: true

  field :message, Types::MessageType, null: true

  def resolve(website_token:, message_id:, email:, token:)
    set_web_widget(website_token)
    set_message(message_id)
    set_token(token)
    set_contact
    @message.update!(submitted_email: email)
    update_contact(email)
    @message.conversation.messages.create!(thanks_email_input_box_template_message_params)

    {
      message: @message
    }
  end

  private

  def thanks_email_input_box_template_message_params
    # TODO add content message to i18n
    {
      account_id: @message.conversation.account.id,
      inbox_id: @message.conversation.inbox_id,
      message_type: :template,
      content: "Thanks, we will back with you shortly"
    }
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

  def set_web_widget(website_token)
    @web_widget = ::Channel::WebWidget.find_by!(website_token: website_token)
  end

  def set_message(id)
    @message = @web_widget.inbox.messages.find(id)
  end
end