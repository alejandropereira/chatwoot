require 'rails_helper'

RSpec.describe Webhook, type: :model do
  describe '#valid_account?' do
    it 'should return true for existing account' do
        account = create(:account, name: "Wiredave")

        workspace = Workspace.new(name_or_subdomain: "Wiredave")

        expect(workspace.valid_account?).to eq true
        expect(workspace.subdomain).to eq "wiredave"
    end

    it 'should return false for not existing account' do
        account = create(:account, name: "Wiredave")

        workspace = Workspace.new(name_or_subdomain: "Publinova")

        expect(workspace.valid_account?).to eq false
    end
  end
end
