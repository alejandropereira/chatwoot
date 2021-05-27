class Admin::CalendarEventsController < Admin::BaseController
  def create
  end

  def members
    @event = CalendarEvent.find(params[:id])
    @agents = AccountUser.where(account: current_account)
    render layout: false
  end
end
