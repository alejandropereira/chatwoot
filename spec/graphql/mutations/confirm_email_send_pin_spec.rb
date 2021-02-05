require 'rails_helper'

RSpec.describe Mutations::ConfirmEmailSendPin, type: :request do
  let(:account) { create(:account) }
  let(:web_widget) { create(:channel_widget, account: account) }
  let(:contact) { create(:contact, account: account, email: nil) }
  let(:contact_inbox) { create(:contact_inbox, contact: contact, inbox: web_widget.inbox) }
  let(:conversation) { create(:conversation, contact: contact, account: account, inbox: web_widget.inbox, contact_inbox: contact_inbox) }
  let(:payload) { { source_id: contact_inbox.source_id, inbox_id: web_widget.inbox.id } }
  let(:token) { ::Widget::TokenService.new(payload: payload).generate_token }
  let(:email) { Faker::Internet.email }

  it 'updates contact email' do
    post '/graphql', params: {
      query: query,
      variables: {
        email: email
      }
    }, headers: { 'X-Auth-Token' => token, 'X-Widget-Token': web_widget.website_token }, as: :json

    contact.reload
    expect(contact.email).to eq(email)
    expect(contact.verification_pins.count).to eq 1
  end

  it 'sends notification email' do
    expect {
      post '/graphql', params: {
        query: query,
        variables: {
          email: email
        }
      }, headers: { 'X-Auth-Token' => token, 'X-Widget-Token': web_widget.website_token }, as: :json
    }.to have_enqueued_job.on_queue('mailers')
  end

  def query
    <<~GQL
      mutation confirmEmailSendPin(
        $email: String!
      ) {
        confirmEmailSendPin(
          input: {
            email: $email
          }
        ) {
          contact {
            email
          }
        }
      }
    GQL
  end
end
