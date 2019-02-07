
'use strict';

(function(){
/*
	function preservedPattern( i ) {
		return "____preserved_" + i + "____";
	}

	function wrapConversion( f ) {
		return function( data ) {
			var preserved = [];

			// Preserve Redmine macro.
			data = data.replace( /\{\{.*?\}\}/g, function( match ) {
				preserved.push( decodeEntities( match ) );
				return preservedPattern( preserved.length );
			});

			// Convert.
			arguments[0] = data;
			data = f.apply( this, arguments );

			// Restore.
			for ( var i = 0; i < preserved.length; i++ ) {
				data = data.replace( preservedPattern( i + 1 ), preserved[i] );
			}

			return data;
		};
	}	
*/
	var element = document.createElement( 'div' );
	function decodeEntities( html ) {
		element.innerHTML = html;
		html = element.textContent;
		element.textContent = '';
		return html;
	}

	function onText( text, node ) {
		return ( node.parent.name == "a" ) ? text : text.replace( /(^|\s)https?:\/\/\S*/g, decodeEntities );
	}

	// Register the plugin in the editor.
	CKEDITOR.plugins.add( 'redmine', {
		requires: 'widget,dialog,autocomplete,textmatch',
		lang: 'en,es', // %REMOVE_LINE_CORE%
		icons: 'wikipage', // %REMOVE_LINE_CORE%
		hidpi: true, // %REMOVE_LINE_CORE%

		onLoad: function() {
			// Register styles for placeholder widget frame.
			CKEDITOR.addCss( '.cke_placeholder{padding:0 4px;margin:0 2px;background-color:#ff0}' );
		},

		init: function( editor ) {

			var lang = editor.lang.redmine;

			// Register Wikilink Widget.
			CKEDITOR.dialog.add( 'redmineWikilink', this.path + 'dialogs/redmineWikilink.js' );
			editor.widgets.add( 'redmineWikilink', {
				dialog: 'redmineWikilink',
				pathName: lang.pathName,
				template: '<span class="cke_placeholder">[[]]</span>',

				downcast: function() {
					return new CKEDITOR.htmlParser.text( '[[' + this.data.name + ']]' );
				},
				init: function() {
					this.setData( 'name', this.element.getText().slice( 2, -2 ) );
				},
				data: function() {
					this.element.setText( '[[' + this.data.name + ']]' );
				},
				getLabel: function() {
					return this.editor.lang.widget.label.replace( /%1/, this.data.name + ' ' + this.pathName );
				}
			} );
			editor.ui.addButton && editor.ui.addButton( 'LinkWikiPage', {
				label: lang.wikiPageLink,
				command: 'redmineWikilink',
				toolbar: 'insert,5',
				icon: 'wikipage'
			} );

			// Register Macro Widget.
			CKEDITOR.dialog.add( 'redmineMacro', this.path + 'dialogs/redmineMacro.js' );
			editor.widgets.add( 'redmineMacro', {
				dialog: 'redmineMacro',
				pathName: lang.pathName,
				template: '<span class="cke_placeholder">{{}}</span>',

				downcast: function() {
					return new CKEDITOR.htmlParser.text( '{{' + this.data.name + '}}' );
				},
				init: function() {
					this.setData( 'name', this.element.getText().slice( 2, -2 ) );
				},
				data: function() {
					this.element.setText( '{{' + this.data.name + '}}' );
				},
				getLabel: function() {
					return this.editor.lang.widget.label.replace( /%1/, this.data.name + ' ' + this.pathName );
				}
			} );
			
			editor.on( 'instanceReady', function() {
				var config = {};

				// Called when the user types in the editor or moves the caret.
				// The range represents the caret position.
				function textTestCallback( range ) {
					// You do not want to autocomplete a non-empty selection.
					if ( !range.collapsed ) {
						return null;
					}

					// Use the text match plugin which does the tricky job of performing
					// a text search in the DOM. The "matchCallback" function should return
					// a matching fragment of the text.
					return CKEDITOR.plugins.textMatch.match( range, matchCallback );
				}

				// Returns the position of the matching text.
				// It matches a word starting from '{{' or the '#' character
				// up to the caret position.
				function matchCallback( text, offset ) {
					var match;

					// Will look for a '[[' characters followed by a wiki page name.
					match = text.slice( 0, offset ).match( /\[{2}([A-z]|\])*$/ );
					if ( match ) {
						return {
							start: match.index,
							end: offset
						};
					}

					// Will look for a '{{' characters followed by a macro name.
					match = text.slice( 0, offset ).match( /\{{2}([A-z]|\})*$/ );
					if ( match ) {
						return {
							start: match.index,
							end: offset
						};
					}

					/* Will look for a '#' character followed by a issue number.
					match = text.slice( 0, offset ).match( /#\d*$/ );
					if ( match ) {
						return {
							start: match.index,
							end: offset
						};
					} */

					return null;
				}

				config.textTestCallback = textTestCallback;

				// WikiPage links sugestions.
				var itemsWikiPageArray = [
					{
						id: 1,
						title: '[[' + lang.wikiPage + ']]',
						description: lang.wikipage_linkTo + lang.wikiPage + '.'
					},
					{
						id: 2,
						title: '[[' + lang.wikiPage + '#' + lang.anchor + ']]',
						description: lang.wikipage_linkTo + lang.wikiPage + '#' + lang.anchor + '.'
					},
					{
						id: 3,
						title: '[[' + lang.wikiPage + '|' + lang.textLink + ']]',
						description: lang.wikipage_linkTo + lang.wikiPage + '|' + lang.textLink + '.'
					},
					{
						id: 4,
						title: '[[' + lang.project + ':' + lang.wikiPage + ']]',
						description: lang.wikipage_linkTo + lang.project + ':' + lang.wikiPage + '.'
					}
				];
				// Macro sugestions.
				var itemsMacroArray = [
					{
						id: 1,
						title: '{{toc}}',
						description: lang.toc
					},
					{
						id: 2,
						title: '{{child_pages}}',
						description: lang.child_pages
					},
					{
						id: 3,
						title: '{{child_pages(depth=2)}}',
						description: lang.child_pages_depth
					},
					{
						id: 4,
						title: '{{include(' + lang.include_page + ')}}',
						description: lang.include
					},
					{
						id: 5,
						title: '{{include(' + lang.include_project + ':' + lang.include_page + ')}}',
						description: lang.include_from_project
					},
					{
						id: 6,
						title: '{{ref_issues([-0,]-i=id)}}',
						description: lang.issues_list_by_id
					},
					{
						id: 7,
						title: '{{ref_issues([-0,]-q=name)}}',
						description: lang.issues_list_by_name
					},
					{
						id: 8,
						title: '{{ref_issues([-0,][-c,]-f:<attr> <op> <[val[|val...]]>)}}',
						description: lang.issues_list_by_attributes
					},
					{
						id: 9,
						title: '{{termno(#)}}',
						description: lang.glossary_term_by_id
					},
					{
						id: 10,
						title: '{{term(' + lang.glossary_name + ')}}',
						description: lang.glossary_term_by_name
					},
					{
						id: 11,
						title: '{{term(' + lang.glossary_name + ',' + lang.glossary_project + ')}}',
						description: lang.glossary_term_by_name_in_proyect
					}
				];

				// Returns (through its callback) the suggestions for the current query.
				function dataCallback( matchInfo, callback ) {
					var itemsArray;
					if (matchInfo.query.substring( 0, 2 ) == '[[' ) {
						itemsArray = itemsWikiPageArray;
					}
					else if (matchInfo.query.substring( 0, 2 ) == '{{' ) {
						itemsArray = itemsMacroArray;
					}
					var suggestions = itemsArray.filter( function( item ) {
						return item.title.indexOf( matchInfo.query.toLowerCase() ) == 0;
					});	

					callback( suggestions );

					/* Remove the '#' tag.
					var query = matchInfo.query.substring( 1 );

					// Simple search.
					// Filter the entire items array so only the items that start
					// with the query remain.
					var suggestions = itemsArray.filter( function( item ) {
						return String( item.id ).indexOf( query ) == 0;
					} );

					// Note: The callback function can also be executed asynchronously
					// so dataCallback can do an XHR request or use any other asynchronous API.
					callback( suggestions ); */
				}

				config.dataCallback = dataCallback;

				// Define the templates of the autocomplete suggestions dropdown and output text.
				config.itemTemplate = '<li data-id="{id}"><strong>{title}</strong><br />{description}</li>';
				config.outputTemplate = "{title}";

				// Attach autocomplete to the editor.
				new CKEDITOR.plugins.autocomplete( editor, config );
			} );
		},

		afterInit: function( editor ) {
			var processor = editor.dataProcessor;

			processor.dataFilter.addRules( {
				text: function( text, node ) {
					var dtd = node.parent && CKEDITOR.dtd[ node.parent.name ];

					if ( dtd && !dtd.span )
						return;

					return text.replace( /\[\[([^\[\]])+\]\]/g, function( match ) {
						// Creating widget code.
						var widgetWrapper = null,
							innerElement = new CKEDITOR.htmlParser.element( 'span', {
								'class': 'cke_placeholder'
							} );

						// Adds placeholder identifier as innertext.
						innerElement.add( new CKEDITOR.htmlParser.text( match ) );
						widgetWrapper = editor.widgets.wrapElement( innerElement, 'redmineWikilink' );

						// Return outerhtml of widget wrapper so it will be placed as replacement.
						return widgetWrapper.getOuterHtml();
					} );
				}
			} );
			processor.dataFilter.addRules( {
				text: function( text, node ) {
					var dtd = node.parent && CKEDITOR.dtd[ node.parent.name ];

					if ( dtd && !dtd.span )
						return;

					return text.replace( /\{\{([^\{\}])+\}\}/g, function( match ) {
						// Creating widget code.
						var widgetWrapper = null,
							innerElement = new CKEDITOR.htmlParser.element( 'span', {
								'class': 'cke_placeholder'
							} );

						// Adds placeholder identifier as innertext.
						innerElement.add( new CKEDITOR.htmlParser.text( match ) );
						widgetWrapper = editor.widgets.wrapElement( innerElement, 'redmineMacro' );

						// Return outerhtml of widget wrapper so it will be placed as replacement.
						return widgetWrapper.getOuterHtml();
					} );
				}
			} );
			processor.htmlFilter.addRules( { text: onText }, 11 );
			processor.dataFilter.addRules( { text: onText }, 11 );
/*
			processor.toHtml = wrapConversion( processor.toHtml );
			processor.toDataFormat = wrapConversion( processor.toDataFormat );
*/
		}
	} );

	CKEDITOR.on( 'dialogDefinition', function( e ) {
		if ( e.data.name == 'table' ) {
			var width = e.data.definition.getContents( 'info' ).get( 'txtWidth' );
			width['default'] = "100%";
		}
	} );

})();
