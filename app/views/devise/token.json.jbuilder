json.payload do
  json.success true
  json.data do
    json.id @resource.id
    json.provider @resource.provider
    json.uid @resource.uid
    json.name @resource.name
    json.nickname @resource.nickname
    json.email @resource.email
    json.phone_number @resource.phone_number
    json.account_id @resource.account.id
    json.pubsub_token @resource.pubsub_token
    json.role @resource.account_user.role
    json.inviter_id @resource.account_user.inviter_id
    json.confirmed @resource.confirmed?
    json.avatar_url @resource.avatar_url
    json.access_token @resource.access_token&.token
  end
end
