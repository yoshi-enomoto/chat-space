require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

# ローカルでの保存は機能しない（AWSでの保存も確認していない）
# S3を使用しているかを判定するためのメソッド。（ローカル環境ではS3を使わないため）
def use_s3?
  Rails.application.secrets.aws_access_key_id && Rails.application.secrets.aws_secret_access_key && 'us-east-1' && 'upload--tteesstt'
end

## CarrierWaveの設定
CarrierWave.configure do |config|
  # S3の設定
  if use_s3?
    # config.storage = :fog
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: Rails.application.secrets.aws_access_key_id,
      aws_secret_access_key: Rails.application.secrets.aws_secret_access_key,
      region: 'us-east-1'
    }

  # S3のバケットを指定。
  config.fog_directory  = 'upload--tteesstt'

  # 一般公開させて無いS3の場合は以下の設定を行う。
  # config.fog_public     = false

  # 一般公開されていない場合は以下の設定をする事で60秒間有効なURLを発行してくれる。
  # config.fog_authenticated_url_expiration = 60
  # CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/

  # config.asset_host = 'https://s3-us-east-1.amazonaws.com/upload--tteesstt'
  config.asset_host = 'https://s3.amazonaws.com/upload--tteesstt'
  end

  # public配下にキャッシュができると参照されてしまうので、予め変えておく。
  config.cache_dir = "#{Rails.root}/tmp/uploads"


end



# 元々の設定
# CarrierWave.configure do |config|
#   config.storage = :fog
#   config.fog_credentials = {
#     provider: 'AWS',
#     aws_access_key_id: Rails.application.secrets.aws_access_key_id,
#     aws_secret_access_key: Rails.application.secrets.aws_secret_access_key,
#     region: 'us-east-1'
#   }

#   config.fog_directory  = 'upload--tteesstt'
#   config.asset_host = 'https://s3-us-east-1.amazonaws.com/upload--tteesstt'
# end
