module RedmineCkeditor
  module Hooks
    class ViewsLayoutsHook < Redmine::Hook::ViewListener
      def view_layouts_base_html_head(context={})
        return stylesheet_link_tag('/plugin_assets/redmine_ckeditor/ckeditor-contrib/plugins/codesnippet/lib/highlight/styles/default.css', :media => 'all') +
          javascript_include_tag('/plugin_assets/redmine_ckeditor/ckeditor-contrib/plugins/codesnippet/lib/highlight/highlight.pack.js') +
            javascript_include_tag('inithighlight', :plugin => 'redmine_ckeditor')
      end
    end
  end
end
