# frozen_string_literal: true

class AccountBuilder
  include CustomExceptions::Account
  pattr_initialize [:account_name!, :email!, :confirmed!, :user, :password, :name]

  def perform
    if @user.nil?
      validate_email
      validate_user
    end
    ActiveRecord::Base.transaction do
      @account = create_account
      @user = create_and_link_user
    end
    [@user, @account]
  rescue StandardError => e
    @account&.destroy
    puts e.inspect
    raise e
  end

  private

  def validate_email
    address = ValidEmail2::Address.new(@email)
    if address.valid? # && !address.disposable?
      true
    else
      raise InvalidEmail.new(valid: address.valid?) # , disposable: address.disposable?})
    end
  end

  def validate_user
    if User.exists?(email: @email)
      raise UserExists.new(email: @email)
    else
      true
    end
  end

  def create_account
    @account = Account.create!(name: @account_name)
    @account.twilio_settings = {}
    @account.processor = 'stripe'
    @account.subscribe(name: ENV['FREE_PLAN_NAME'], plan: ENV['FREE_PLAN_ID'])
    Current.account = @account
  end

  def create_and_link_user
    if @user.present? || create_user
      link_user_to_account(@user, @account)
      @user
    else
      raise UserErrors.new(errors: @user.errors)
    end
  end

  def link_user_to_account(user, account)
    AccountUser.create!(
      account_id: account.id,
      user_id: user.id,
      role: AccountUser.roles['administrator']
    )
  end

  def email_to_name(email)
    name = email[/[^@]+/]
    name.split('.').map(&:capitalize).join(' ')
  end

  def create_user
    generated_password = Time.now.to_i
    @user = User.new(email: @email,
                     password: @password || generated_password,
                     password_confirmation: @password || generated_password,
                     name: @name || email_to_name(@email))
    @user.confirm if @confirmed
    @user.save!
  end
end
