require 'rails_helper'

RSpec.describe Mutations::ConfirmPinSecureChat, type: :request do
  let(:account) { create(:account) }
  let(:web_widget) { create(:channel_widget, account: account) }
  let(:contact) { create(:contact, account: account, email: nil) }
  let(:verification_pin) { create(:verification_pin, verificable: contact) }
  let(:contact_inbox) { create(:contact_inbox, contact: contact, inbox: web_widget.inbox) }
  let(:conversation) { create(:conversation, contact: contact, account: account, inbox: web_widget.inbox, contact_inbox: contact_inbox) }
  let(:payload) { { source_id: contact_inbox.source_id, inbox_id: web_widget.inbox.id } }
  let(:token) { ::Widget::TokenService.new(payload: payload).generate_token }

  it 'sets secured to true on conversation' do
    post '/graphql', params: {
      query: query,
      variables: {
        conversationId: conversation.reload.uuid,
        verificationPin: verification_pin.code
      }
    }, headers: { 'X-Auth-Token' => token, 'X-Widget-Token': web_widget.website_token }, as: :json

    conversation.reload
    expect(conversation.secured?).to eq(true)
  end

  it 'returns error with incorrect pin' do
    post '/graphql', params: {
      query: query,
      variables: {
        conversationId: conversation.reload.uuid,
        verificationPin: '1234'
      }
    }, headers: { 'X-Auth-Token' => token, 'X-Widget-Token': web_widget.website_token }, as: :json

    conversation.reload
    expect(conversation.secured?).to eq(false)
  end

  def query
    <<~GQL
      mutation confirmPinSecureChat(
        $conversationId: ID!
        $verificationPin: String!
      ) {
        confirmPinSecureChat(
          input: {
            conversationId: $conversationId
            verificationPin: $verificationPin
          }
        ) {
          conversation {
            secured
          }
        }
      }
    GQL
  end
end
