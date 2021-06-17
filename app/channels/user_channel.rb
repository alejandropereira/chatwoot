class UserChannel < ApplicationCable::Channel
  def subscribed
    current_user.update(availability: "online")
    stream_for current_user
  end

  def unsubscribed
    current_user.update(availability: "offline")
  end
end
