require 'redmine'
require 'redmine_git_hosting'

Redmine::Plugin.register :redmine_git_hosting do
  name        'Redmine Git Hosting Plugin'
  author      'A lot of people! A big thank to them for their contribution!'
  description 'Enables Redmine to control hosting of Git repositories through Gitolite'
  version     RedmineGitHosting::VERSION
  url         'http://redmine-git-hosting.io/'
  author_url  'settings/plugin/redmine_git_hosting/authors'

  settings(partial: 'settings/redmine_git_hosting', default: RedmineGitHosting.settings)
  requires_redmine version_or_higher: '4.1.0'

  menu :project_menu,
       :new_repository,
       { controller: 'repositories', action: 'new' },
       param: :project_id,
       caption: :label_repository_new,
       parent: :new_object

  begin
    requires_redmine_plugin :additionals, version_or_higher: '3.0.1'
  rescue Redmine::PluginNotFound
    raise 'Please install additionals plugin (https://github.com/alphanodes/additionals)'
  end
end

# This *must stay after* Redmine::Plugin.register statement
# because it needs to access to plugin settings...
# so we need the plugin to be fully registered...
Rails.configuration.to_prepare do
  require_dependency 'load_gitolite_hooks'
end
