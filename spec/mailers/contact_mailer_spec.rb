require 'rails_helper'

RSpec.describe ContactMailer, type: :mailer do
  describe 'send_pin' do
    let(:pin) { create(:verification_pin)}
    let(:mail) { described_class.send_pin(pin) }

    it 'renders the headers' do
      expect(mail.subject).to eq('Verification Pin')
      expect(mail.to).to eq([pin.verificable.email])
      expect(mail.from).to eq(['accounts@chatwoot.com'])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match(pin.code)
    end
  end

end
