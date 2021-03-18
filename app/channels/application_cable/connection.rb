class ApplicationCable::Connection < ActionCable::Connection::Base
  identified_by :current_user

  def connect
    self.current_user = find_verified_user
  end

  protected

  def find_verified_user
    if (current_user = env["warden"].user(:admin))
      current_user
    else
      reject_unauthorized_connection
    end
  end
end
