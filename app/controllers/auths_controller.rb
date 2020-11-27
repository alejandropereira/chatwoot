class AuthsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    @account = Account.find_by!(subdomain: params[:workspace]&.parameterize)
    render json: { workspace: @account.subdomain }, status: :ok
  end
end
