class Mutations::CreateEvent < Mutations::BaseMutation
  argument :start_time, String, required: true
  argument :end_time, String, required: true
  argument :name, String, required: true
  argument :email, String, required: true
  argument :content, String, required: true
  argument :conversation_id, ID, required: true

  field :event_id, ID, null: true

  def resolve(conversation_id:, start_time:, end_time:, name:, email:, content:)
    conversation = Conversation.find_by(uuid: conversation_id)
    contact = conversation.contact
    assignee = conversation.assignee.account_users.find_by(account_id: conversation.account_id)
    contact.update!(name: name, email: email)
    message = conversation.messages.where(content_type: "schedule").last
    message.update!(content: content.gsub(/AGENT/, assignee&.name || conversation.account.name), submitted_values: true)
    event = CalendarEvent.new(start_time: start_time, end_time: end_time, title: "#{name} - #{email}", account_id: conversation.account_id)
    event.invitees << conversation.assignee.account_users.find_by(account_id: conversation.account_id) if conversation.assignee.present?
    event.save!

    {
      event_id: event.id,
    }
  end
end
