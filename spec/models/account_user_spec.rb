# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AccountUser do
  let!(:account_user) { create(:account_user) }

  context 'delegate' do
    it { is_expected.to delegate_method(:first_name).to(:user) }
    it { is_expected.to delegate_method(:last_name).to(:user) }
    it { is_expected.to delegate_method(:email).to(:user) }
  end

  context 'associations' do
    it { is_expected.to have_many(:event_invitees) }
    it { is_expected.to have_many(:events) }
  end

  describe 'notification_settings' do
    it 'gets created with the right default settings' do
      expect(account_user.user.notification_settings).not_to eq(nil)

      expect(account_user.user.notification_settings.first.email_conversation_creation?).to eq(false)
      expect(account_user.user.notification_settings.first.email_conversation_assignment?).to eq(true)
    end
  end
end
