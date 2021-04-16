class Admin::BaseController < ActionController::Base
  set_current_tenant_by_subdomain(:account, :subdomain)
  include CableReady::Broadcaster
  include Pagy::Backend
  layout 'admin'
  protect_from_forgery with: :null_session
  before_action :authenticate_admin!
  before_action :set_current_account!
  before_action :set_time_zone
  helper_method :current_account

  def current_account
    ActsAsTenant.current_tenant
  end

  def set_time_zone
    Time.zone = browser_time_zone
  end

  def set_current_account!
    Current.account = current_account
  end

  private

  def browser_time_zone
    browser_tz = ActiveSupport::TimeZone.find_tzinfo(cookies[:timezone])
    ActiveSupport::TimeZone.all.find{ |zone| zone.tzinfo == browser_tz } || Time.zone
  rescue TZInfo::UnknownTimezone, TZInfo::InvalidTimezoneIdentifier
    Time.zone
  end
end
