class Api::V1::ProfilesController < Api::BaseController
  before_action :set_user

  def show
    render json: @user
  end

  def update
    @user.update!(profile_params)
  end

  private

  def set_user
    @user = current_user
  end

  def profile_params
    params.require(:profile).permit(:email, :name, :password, :password_confirmation, :avatar, :phone_number)
  end
end
