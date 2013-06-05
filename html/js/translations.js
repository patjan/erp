"use strict";

/**
 * permissions.html
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Translations'
		, table_name	: 'Translations'
		, specific		: 'locale'
		, select		: 'Active'
		, filter		: ''
		, sort_by		: 'sentence'
		, sort_seq		: 'ASC'
		, focus			: 'en_us'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-action-export'		).click (function() {JKY.process_export		();});
	$('#jky-action-publish'		).click (function() {JKY.process_publish	();});
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_menu_active('jky-menu-support');
	JKY.set_side_active('jky-support-translations');
	JKY.set_html('jky-status'			, JKY.set_controls('Status Codes'	, 'Active', ''));
	JKY.show('jky-side-support');
	JKY.languages	= JKY.get_controls('Languages');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-sentence"		>' + the_row.sentence		+ '</td>'
		+  '<td class="jky-created-at"		>' + the_row.created_date	+ '</td>'
		+  '<td class="jky-updated-at"		>' + the_row.updated_date	+ '</td>'
		+  '<td class="jky-status"			>' + the_row.status			+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.get_form_set = function() {
	var my_set = ''
		+          'status=\'' + JKY.get_value	('jky-status'			) + '\''
		+        ', locale=\'' +				 'en_us'				  + '\''
		+      ', sentence=\'' + JKY.get_value	('en_us'				) + '\''
		;
	return my_set;
}

JKY.process_update_more = function(row_id) {
	for(var l=0; l<JKY.languages.length; l++) {
		var my_locale = JKY.languages[l].name ;
		if (my_locale != 'en_us') {
			var my_where = '  parent_id='   + row_id
						 + ' AND locale=\'' + my_locale + '\''
						;
			var my_id = JKY.get_id(jky_table, my_where);
			if (my_id) {
				var my_set  = '  sentence=\'' + JKY.get_value(my_locale) + '\'';
				var my_data = {method:'update', table:jky_table, set:my_set, where:'id=' + my_id};
				JKY.ajax(true, my_data);
			}else{
				var my_set  = ' parent_id='   + row_id
							+ ',   locale=\'' + my_locale + '\''
							+ ', sentence=\'' + JKY.get_value(my_locale) +'\''
							;
				var my_data = {method:'insert', table:jky_table, set:my_set};
				JKY.ajax(true, my_data);
			}
		}
	}
};

/**
 * process publish
 */
JKY.process_publish = function() {
	var my_data =
		{ method: 'publish'
		, table :  jky_table
	};
	JKY.ajax(false, my_data, JKY.process_publish_success);
	};

JKY.process_publish_success = function(response) {
	JKY.display_trace('process_publish_success');
	JKY.display_message(response.message);
}
