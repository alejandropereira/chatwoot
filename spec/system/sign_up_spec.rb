require 'rails_helper'

RSpec.describe "SignUps", type: :system do
  before do
    driven_by :selenium_chrome
    Capybara.app_host = "http://lvh.me"
  end

  around(:each) do |example|
    Sidekiq::Testing.inline! do
      example.run
    end
  end

  it "should be successfully" do
    visit "/admin"
    click_on 'Sign up'
    fill_in 'Account Name', with: 'Wiredave'
    fill_in 'Name', with: 'Alex Pereira'
    fill_in 'Email', with: 'test@example.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'
    click_on 'Sign up'
    expect(page).to have_content 'A message with a confirmation link has been sent to your email address. Please follow the link to activate your account.'
    sleep 0.1
    open_email('test@example.com')
    expect(current_email).to have_content 'Welcome, Alex Pereira!'
    current_email.click_link 'Confirm my account'
    expect(page).to have_content 'Select a Conversation'
    fill_in 'Name *', with: 'Wired Avenue'
    fill_in 'Website url *', with: 'wiredave.com'
    click_on 'Create Web widget'
    expect(page).to_not have_content 'Setup your first inbox'
    expect(page).to have_content 'Insert this custom html on your website'
    magic_test
  end
end
