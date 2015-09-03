"use strict";

/**
 * templates.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Templates'
		, table_name	: 'Templates'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'updated_at'
		, sort_seq		: 'ASC'
		, sort_list		: [[1, 0]]
		, focus			: 'jky-template-name'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-template-name'		).change(function()	{if (JKY.row == null)	JKY.title_case(this);});
	$('#jky-template-subject'	).change(function()	{if (JKY.row == null)	JKY.title_case(this);});

//	$('#jky-updated-date input').attr('data-format', JKY.Session.get_date_time	());

	JKY.set_side_active('jky-support-templates');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_html('jky-template-type'	, JKY.set_controls('Template Types'));
	JKY.set_html('jky-app-select'		, JKY.set_options(JKY.App.get_prop('select'), 'All', 'Active', 'Inactive'));
	JKY.set_html('jky-app-select-label'	, JKY.t('Status'));
	JKY.show('jky-app-select-line');
//	select the first option as default
	$('#jky-app-select option').eq(1).prop('selected', true);
	$('#jky-app-select').change();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-name-s"	>' + the_row.template_name		+ '</td>'
		+  '<td class="jky-td-name-s"	>' + the_row.template_type		+ '</td>'
		+  '<td class="jky-td-name-l"	>' + the_row.template_subject	+ '</td>'
		+  '<td class="jky-td-status"	>' + the_row.status				+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	if (the_row.status == 'Active') {
		JKY.enable_button ('jky-action-close'	);
		JKY.enable_button ('jky-action-delete'  );
		JKY.enable_button ('jky-batches-add-new');
	}else{
		JKY.disable_button('jky-action-close'	);
		JKY.disable_button('jky-action-delete'  );
		JKY.disable_button('jky-batches-add-new');
	}

	JKY.set_value	('jky-updated-at'		,				 the_row.updated_at			);
	JKY.set_value	('jky-updated-name'		,				 the_row.updated_name		);
	JKY.set_value	('jky-template-name'	,				 the_row.template_name		);
	JKY.set_value	('jky-template-type'	,				 the_row.template_type		);
	JKY.set_value	('jky-template-subject'	,				 the_row.template_subject	);
	JKY.set_value	('jky-template-body'	, JKY.decode	(the_row.template_body		));
	JKY.set_value	('jky-template-sql'		, JKY.decode	(the_row.template_sql		));
	JKY.set_value	('jky-description'		, JKY.decode	(the_row.description		));
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_html	('jky-status'			, 'Active');
	JKY.set_value	('jky-updated-at'		,  JKY.out_time(JKY.get_now ()));
	JKY.set_value	('jky-updated-name'		,  JKY.Session.get_value('full_name'));
	JKY.set_value	('jky-template-name'	, '');
	JKY.set_value	('jky-template-type'	, 'By Event');
	JKY.set_value	('jky-template-subject'	, '');
	JKY.set_value	('jky-template-body'	, '');
	JKY.set_value	('jky-template-sql'		, '');
	JKY.set_value	('jky-description'		, '');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+       'template_name=\'' +			JKY.get_value('jky-template-name'	)	+ '\''
		+     ', template_type=\'' +			JKY.get_value('jky-template-type'	)	+ '\''
		+  ', template_subject=\'' +			JKY.get_value('jky-template-subject')	+ '\''
		+     ', template_body=\'' + JKY.encode(JKY.get_value('jky-template-body'	))	+ '\''
		+      ', template_sql=\'' + JKY.encode(JKY.get_value('jky-template-sql'	))	+ '\''
		+       ', description=\'' + JKY.encode(JKY.get_value('jky-description'		))	+ '\''
		;
	return my_set;
};
