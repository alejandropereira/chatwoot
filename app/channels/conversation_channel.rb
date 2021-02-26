class ConversationChannel < ApplicationCable::Channel
  def subscribed
    stream_for Conversation.find(params[:conversation_id])
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
