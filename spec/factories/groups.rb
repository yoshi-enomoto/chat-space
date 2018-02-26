FactoryGirl.define do
  factory :group do
    group_name Faker::Team.name #前半はカラム名と合わせる、後半は.name
  end
end
