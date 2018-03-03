json.messages @messages.each do |message|
  json.body  message.body
  json.image  message.image_url
  json.created_at  format_posted_time(message.created_at)
  json.user_name  message.user.name
  json.id message.id
end
