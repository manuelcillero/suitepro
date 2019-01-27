
'use strict';

CKEDITOR.dialog.add( 'redmineWikilink', function( editor ) {
	var lang = editor.lang.redmine,
		generalLabel = editor.lang.common.generalTab,
		validNameRegex = /^[^\[\]<>]+$/;

	return {
		title: lang.wikiPageLink,
		minWidth: 300,
		minHeight: 80,
		contents: [
			{
				id: 'info',
				label: generalLabel,
				title: generalLabel,
				elements: [
					{
						id: 'name',
						type: 'text',
						style: 'width: 100%;',
						label: lang.wikiPage,
						'default': '',
						required: true,
						validate: CKEDITOR.dialog.validate.regex( validNameRegex, lang.invalidWikiPageLink ),
						setup: function( widget ) {
							this.setValue( widget.data.name );
						},
						commit: function( widget ) {
							widget.setData( 'name', this.getValue() );
						}
					},
					{
						type: 'html',
						html: '- ' + lang.help_line1 + '<br />'
							+ '- ' + lang.help_line2 + '<br />'
							+ '- ' + lang.help_line3
					}
				]
			}
		]
	};
} );
