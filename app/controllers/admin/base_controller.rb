class Admin::BaseController < ActionController::Base
  layout 'admin'
  protect_from_forgery with: :null_session
  before_action :authenticate_admin!
end
