require File.expand_path "#{File.dirname __FILE__}/../../../spec/spec_helper"

HOME_BASE_DIR = RUBY_PLATFORM.include?('darwin') ? '/Users' : '/home'

## Configure RSpec
RSpec.configure do |config|
  # Include our helpers from support directory
  config.include GlobalHelpers

  config.before(:suite) do
    RedmineGitHosting::Config.reload_from_file!
    Setting.enabled_scm = %w[Git Subversion Xitolite]
  end
end
