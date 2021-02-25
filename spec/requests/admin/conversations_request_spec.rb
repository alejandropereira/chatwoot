require 'rails_helper'

RSpec.describe "Admin::Conversations", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/admin/conversations/index"
      expect(response).to have_http_status(:success)
    end
  end

end
