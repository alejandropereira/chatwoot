class Types::MutationType < Types::BaseObject
  field :create_message, mutation: Mutations::CreateMessage
  field :update_contact_email, mutation: Mutations::UpdateContactEmail
end

