FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    # サーバー立ち上げ時、Errno::ENOENTエラーが発生する為、コメアウト
    # image File.open("#{Rails.root}/public/image/f36c375c339f1212cceb122fdb9d0808_t.jpg")
    group
    user
  end
end
