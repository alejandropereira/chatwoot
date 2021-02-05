class Types::MutationType < Types::BaseObject
  field :create_message, mutation: Mutations::CreateMessage
  field :update_contact_email, mutation: Mutations::UpdateContactEmail
  field :confirm_email_send_pin, mutation: Mutations::ConfirmEmailSendPin
  field :toggle_customer_typing, mutation: Mutations::ToggleCustomerTyping
end

