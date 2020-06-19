# loading installation configs
GlobalConfig.clear_cache
ConfigLoader.new.process
Account.destroy_all
User.destroy_all
AccountUser.destroy_all
Channel::WebWidget.destroy_all
Inbox.destroy_all
InboxMember.destroy_all
Contact.destroy_all
ContactInbox.destroy_all
Conversation.destroy_all
Message.destroy_all

account = Account.create!(
  name: 'Wired Avenue',
  domain: 'support.wiredave.com',
  support_email: ENV.fetch('MAILER_SENDER_EMAIL', 'accounts@wiredave.com')
)

user = User.new(name: 'Alejandro Pereira', email: 'alex@wiredave.com', password: '123456')
user.skip_confirmation!
user.save!

AccountUser.create!(
  account_id: account.id,
  user_id: user.id,
  role: :administrator
)

web_widget = Channel::WebWidget.create!(account: account, website_url: 'https://wiredave.com')

inbox = Inbox.create!(channel: web_widget, account: account, name: 'Wiredave Support')
InboxMember.create!(user: user, inbox: inbox)

contact = Contact.create!(name: 'jane', email: 'jane@example.com', phone_number: '0000', account: account)
contact_inbox = ContactInbox.create!(inbox: inbox, contact: contact, source_id: user.id)
conversation = Conversation.create!(
  account: account,
  inbox: inbox,
  status: :open,
  assignee: user,
  contact: contact,
  contact_inbox: contact_inbox,
  additional_attributes: {}
)
Message.create!(content: 'Hello', account: account, inbox: inbox, conversation: conversation, message_type: :incoming)
CannedResponse.create!(account: account, short_code: 'start', content: 'Hello welcome to chatwoot.')
