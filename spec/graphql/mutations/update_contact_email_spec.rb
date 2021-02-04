require 'rails_helper'

RSpec.describe Mutations::UpdateContactEmail, type: :request do
  let(:account) { create(:account) }
  let(:web_widget) { create(:channel_widget, account: account) }
  let(:contact) { create(:contact, account: account, email: nil) }
  let(:contact_inbox) { create(:contact_inbox, contact: contact, inbox: web_widget.inbox) }
  let(:conversation) { create(:conversation, contact: contact, account: account, inbox: web_widget.inbox, contact_inbox: contact_inbox) }
  let(:payload) { { source_id: contact_inbox.source_id, inbox_id: web_widget.inbox.id } }
  let(:token) { ::Widget::TokenService.new(payload: payload).generate_token }

  it 'updates contact email' do
    message = create(:message, content_type: 'input_email', account: account, inbox: web_widget.inbox, conversation: conversation)
    email = Faker::Internet.email

    post '/graphql', params: { 
      query: query,
      variables: { 
        websiteToken: web_widget.website_token,
        messageId: message.id,
        email: email,
        token: token
      }
    }

    message.reload
    expect(message.submitted_email).to eq(email)
    expect(message.conversation.contact.email).to eq(email)
    expect(conversation.messages.last.content).to match(/thanks/i)
  end

  def query
    <<~GQL
      mutation updateContactEmail(
        $websiteToken: String!
        $token: String!
        $messageId: ID!
        $email: String!
      ) {
        updateContactEmail(
          input: {
            websiteToken: $websiteToken
            token: $token
            messageId: $messageId
            email: $email
          }
        ) {
          message {
            contentAttributes
          }
        }
      }
    GQL
  end
end
