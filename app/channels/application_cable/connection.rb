class ApplicationCable::Connection < ActionCable::Connection::Base
  include SetCurrentRequestDetails

  identified_by :current_user, :current_account

  def connect
    self.current_user = find_verified_user
    set_request_details
    self.current_account = Current.account

    logger.add_tags "ActionCable", "User #{self.current_user.id}", "Account #{self.current_account.id}"
  end

  protected

  def find_verified_user
    if (current_user = env["warden"].user(:admin))
      current_user
    else
      reject_unauthorized_connection
    end
  end

  def set_current_tenant(account)
    ActsAsTenant.current_tenant = account
  end
end
