require 'rails_helper'

RSpec.describe "SignUps", type: :system do
  before do
    driven_by(:selenium_chrome)
  end

  it "should be successfully" do
    visit "/admin"
    magic_test
  end
end
