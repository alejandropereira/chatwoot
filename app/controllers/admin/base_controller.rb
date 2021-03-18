class Admin::BaseController < ActionController::Base
  set_current_tenant_by_subdomain(:account, :subdomain)
  include CableReady::Broadcaster
  layout 'admin'
  protect_from_forgery with: :null_session
  before_action :authenticate_admin!
  helper_method :current_account

  def current_account
    ActsAsTenant.current_tenant
  end
end
