
require 'rails_helper'

describe '/auths', type: :request do

  describe 'POST /auths/verify_workspace' do
    it 'returns true when workspace exists' do
      create(:account, name: "Wiredave")

      post auths_url(workspace: 'wiredave')

      expect(response).to be_successful
      expect(response.body).to include('wiredave')
    end

    it 'handles workspaces with space' do
      create(:account, name: "Wired Avenue")

      post auths_url(workspace: 'Wired Avenue')

      expect(response).to be_successful
      expect(response.body).to include('wired-avenue')
    end

    it 'returns 404 when no workspace' do
      post auths_url

      expect(response.status).to eq(404)
    end

    it 'returns 404 when workspace not exists' do
      post auths_url(workspace: 'not-found')

      expect(response.status).to eq(404)
    end
  end
end
