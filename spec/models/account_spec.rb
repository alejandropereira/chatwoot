# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Account do
  it { is_expected.to validate_presence_of(:name) }

  it { is_expected.to have_many(:users).through(:account_users) }
  it { is_expected.to have_many(:account_users) }
  it { is_expected.to have_many(:inboxes).dependent(:destroy) }
  it { is_expected.to have_many(:conversations).dependent(:destroy) }
  it { is_expected.to have_many(:contacts).dependent(:destroy) }
  it { is_expected.to have_many(:telegram_bots).dependent(:destroy) }
  it { is_expected.to have_many(:canned_responses).dependent(:destroy) }
  it { is_expected.to have_many(:facebook_pages).class_name('::Channel::FacebookPage').dependent(:destroy) }
  it { is_expected.to have_many(:web_widgets).class_name('::Channel::WebWidget').dependent(:destroy) }
  it { is_expected.to have_many(:webhooks).dependent(:destroy) }
  it { is_expected.to have_many(:notification_settings).dependent(:destroy) }
  it { is_expected.to have_many(:events) }

  context 'pay attributes' do
    it 'delegates to first administrator' do
      account = create(:account, account_users: [
        build(:account_user, role: :administrator, user: build(:user, name: 'John Doe', email: 'john@doe.com')),
        build(:account_user, role: :agent, user: build(:user, name: 'Julie Doe', email: 'julie@doe.com'))
      ])

      expect(account.first_name).to eq 'John'
      expect(account.last_name).to eq 'Doe'
      expect(account.email).to eq 'john@doe.com'
    end
  end
end
