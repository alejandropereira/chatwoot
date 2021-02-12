class Mutations::ConfirmEmailSendPin < Mutations::BaseMutation
  argument :email, String, required: true

  field :contact, Types::ContactType, null: true

  def resolve(email:)
    set_web_widget
    set_token
    set_contact
    update_contact(email)
    @contact.verification_pins.create!

    {
      contact: @contact
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
    @contact.update!(
      email: email
    ) unless @contact.email == email
  end

  def set_web_widget
    @web_widget = context[:widget]
  end
end