module HomeHelper
  def credits_url
    url = root_path
    user = current_user
    if user
      url = user_path(user)
    else
      url = root_path + "#credits"
    end
    return url
  end

  def sign_in_up_url
    user = current_user
    if user
      user_path user
    else
      root_path + "#sign_in_up"
    end
  end

end
