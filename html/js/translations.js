"use strict";

/**
 * translations.js
 */

JKY.languages	= [];
JKY.today		= JKY.get_date();

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
		, select		: ''
		, filter		: ''
		, sort_by		: 'sentence'
		, sort_seq		: 'ASC'
		, focus			: 'en_US'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
//	$('#jky-tab-lines'		).click (function() {JKY.display_lines	();});
//	$('#jky-line-add-new'	).click (function() {JKY.insert_line	();});
//	$('#jky-thread-filter'	).KeyUpDelay(JKY.Thread.load_data);
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-support-translations');
	JKY.set_html('jky-app-select'		, JKY.set_options(JKY.App.get('select'), 'All', 'Active', 'Inactive'));
	JKY.set_html('jky-app-select-label'	, JKY.t('Status'));
	JKY.show('jky-app-select-line');
//	select the first option as default
	$('#jky-app-select option').eq(1).prop('selected', true);
	$('#jky-app-select').change();

	JKY.show('jky-action-publish');
	JKY.languages = JKY.get_controls('Languages');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-sentence"		>' + 				the_row.sentence		+ '</td>'
		+  '<td class="jky-updated-at"		>' + JKY.short_date(the_row.updated_at)		+ '</td>'
		+  '<td class="jky-status"			>' + 				the_row.status			+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_html	('jky-status'				, JKY.t(the_row.status		));
	var my_rows = JKY.get_rows(JKY.App.get('table_name'), the_row.id);
	var my_html = '';
	for(var l=0; l<JKY.languages.length; l++) {
		var my_locale   = JKY.languages[l].name ;
		var my_language = JKY.languages[l].value;
		var my_sentence = '';
		for(var n=0; n<my_rows.length; n++) {
			var my_row = my_rows[n];
			if (my_row.locale == 'en_US') {
				JKY.row_id = my_row.id;
				JKY.set_option('jky_status', my_row.status);
			}
			if (my_row.locale == my_locale) {
				my_sentence = my_row.sentence;
			}
		}
		my_html += '<div class="jky-form-line">'
				+  '<div class="jky-form-label">' + my_language + ':</div>'
				+  '<div class="jky-left">'
				+  '<input id="' + my_locale + '" class="jky-form-sentence" value="' + my_sentence + '" onkeyup="JKY.Changes.increment();" />'
				+  '</div>'
				+  '</div>'
				;
	}
	JKY.set_html('jky-locales', my_html);
	$('#jky-form-data input[id]').each (function() {$(this).change(function() 	{JKY.App.process_change_input(this);});});
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	var my_html = '';
	for(var l=0; l<JKY.languages.length; l++) {
		var my_locale   = JKY.languages[l].name ;
		var my_language = JKY.languages[l].value;
		var my_sentence = '';
		my_html += '<div class="jky-form-line">'
				+  '<div class="jky-form-label">' + my_language + ':</div>'
				+  '<div class="jky-left">'
				+  '<input id="' + my_locale + '" class="jky-form-sentence" value="' + my_sentence + '" />'
				+  '</div>'
				+  '</div>'
				;
	}
	JKY.set_html('jky-locales', my_html);
	$('#jky-form-data input[id]').each (function() {$(this).change(function() 	{JKY.App.process_change_input(this);});});
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+          'locale=\'' +				 'en_US'				  + '\''
		+      ', sentence=\'' + JKY.get_value	('en_US'				) + '\''
		;
	return my_set;
}

JKY.process_insert = function(the_id) {
	var my_data =
		{ method: 'update'
		, table :  JKY.App.get('table_name')
		, set	: 'parent_id = ' + the_id
		, where :        'id = ' + the_id
		};
	JKY.ajax(false, my_data);
	JKY.process_update(the_id);
}

JKY.process_update = function(the_id, the_row) {
	for(var l=0; l<JKY.languages.length; l++) {
		var my_locale = JKY.languages[l].name ;
		if (my_locale != 'en_US') {
			var my_where = '  parent_id='   + the_id
						 + ' AND locale=\'' + my_locale + '\''
						;
			var my_id = JKY.get_id(JKY.App.get('table_name'), my_where);
			if (my_id) {
				var my_set  = '  sentence=\'' + JKY.get_value(my_locale) + '\'';
				var my_data = {method:'update', table:JKY.App.get('table_name'), set:my_set, where:'id=' + my_id};
				JKY.ajax(true, my_data);
			}else{
				var my_set  = ' parent_id='   + the_id
							+ ',   locale=\'' + my_locale + '\''
							+ ', sentence=\'' + JKY.get_value(my_locale) +'\''
							;
				var my_data = {method:'insert', table:JKY.App.get('table_name'), set:my_set};
				JKY.ajax(true, my_data);
			}
		}
	}
};

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table :  JKY.App.get('table_name')
		, where : 'parent_id = ' + the_id
		};
	JKY.ajax(false, my_data, JKY.process_delete_success);
}

/**
 * process publish
 */
JKY.process_publish = function() {
	var my_data =
		{ method: 'publish'
		, table :  JKY.App.get('table_name')
	};
	JKY.ajax(false, my_data, JKY.process_publish_success);
	};

JKY.process_publish_success = function(response) {
	JKY.display_trace('process_publish_success');
	JKY.display_message(response.message);
}
