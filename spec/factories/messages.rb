FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/f36c375c339f1212cceb122fdb9d0808_t.jpg")
    group
    user
  end
end
