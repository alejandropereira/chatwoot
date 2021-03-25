# frozen_string_literal: true

class AvatarComponent < ViewComponent::Base

  attr_reader :user
  def initialize(user:)
    @user = user
  end

  def avatar_url
    if user.avatar_url.present?
      avatar_image
    elsif gravatar_exists?
      gravatar_image
    else
      initials_element
    end
  end

  def name
    if user.respond_to?(:name)
      return user.name
    end
    
    [user.first_name, user.last_name].join(' ')
  end

  private

  def gravatar_exists?
    hash = Digest::MD5.hexdigest(email)
    http = Net::HTTP.new('www.gravatar.com', 80)
    http.read_timeout = 2
    response = http.request_head("/avatar/#{hash}?default=http://gravatar.com/avatar")
    response.code != '302' ? true : false
  rescue StandardError, Timeout::Error
    false
  end

  def avatar_image
    image_tag(user.avatar_url, alt: name, class: 'avatar-circle')
  end

  def gravatar_image
    gravatar_id = Digest::MD5.hexdigest(email)
    gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}"
    image_tag(gravatar_url, alt: name, class: 'avatar-circle')
  end

  def initials_element
    style = "background-color: #{avatar_color(initials.first)};"
    content_tag :div, class: 'avatar-circle w-full h-full flex justify-center items-center', style: style do
      content_tag :div, initials, class: 'text-white text-lg'
    end
  end

  def email
    user.email
  end

  def initials
    name.split.first(2).map(&:first).join
  end

  def avatar_color(initial)
    colors = [
      '#00AA55', '#009FD4', '#B381B3', '#939393', '#E3BC00',
      '#D47500', '#DC2A2A', '#696969', '#ff0000', '#ff80ed',
      '#407294', '#133337', '#065535', '#c0c0c0', '#5ac18e',
      '#666666', '#f7347a', '#576675', '#696966', '#008080',
      '#ffa500', '#40e0d0', '#0000ff', '#003366', '#fa8072',
      '#800000'
    ]

    colors[initial.first.to_s.downcase.ord - 97] || '#000000'
  end
end
