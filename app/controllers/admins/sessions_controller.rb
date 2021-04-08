# frozen_string_literal: true

class Admins::SessionsController < Devise::SessionsController
  before_action :check_subdomain, only: :new
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  def new
    super
  end

  # POST /resource/sign_in
  def create
    super do
      sign_in(:admin, resource) if resource.errors.empty?
    end
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
  def after_sign_out_path_for(resource)
    admin_root_path
  end

  def after_sign_in_path_for(resource)
    admin_conversations_path
  end

  private
  
  def check_subdomain
    if request.subdomain.blank?
      redirect_to new_admin_workspace_path, notice: "Lets find your workspace."
    end

    account = Account.friendly.find(request.subdomain)
  rescue
    redirect_to new_admin_workspace_url(subdomain: ""), notice: "Lets find your workspace."
  end
end
