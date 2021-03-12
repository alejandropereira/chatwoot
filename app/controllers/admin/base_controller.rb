class Admin::BaseController < ActionController::Base
  include CableReady::Broadcaster
  layout 'admin'
  protect_from_forgery with: :null_session
  before_action :authenticate_admin!
end
