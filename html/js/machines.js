"use strict";

/**
 * machines.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Machines'
		, table_name	: 'Machines'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'name'
		, sort_seq		: 'ASC'
		, sort_list		: [[1, 0]]
		, focus			: 'jky-name'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-purchase-date	input').attr('data-format', JKY.Session.get_date());
	$('#jky-repair-date		input').attr('data-format', JKY.Session.get_date());
	$('#jky-return-date		input').attr('data-format', JKY.Session.get_date());
	$('#jky-purchase-date'		).datetimepicker({language: JKY.Session.get_locale(), pickTime:false});
	$('#jky-repair-date'		).datetimepicker({language: JKY.Session.get_locale(), pickTime:false});
	$('#jky-return-date'		).datetimepicker({language: JKY.Session.get_locale(), pickTime:false});

	$('#jky-machine-name'		).change(function()	{if (JKY.row == null)	JKY.title_case(this);});

	$('#jky-cylinder-add-new'	).click (function() {JKY.insert_cylinder	();});
	$('#jky-action-save-remarks').click (function()	{JKY.save_remarks		();});

	JKY.set_side_active('jky-planning-machines');
	JKY.set_side_active('jky-threads-machines');
	JKY.set_side_active('jky-production-machines');
	JKY.set_side_active('jky-dyers-machines');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-cylinder', '../JKY.Search.Cylinder.html');
	JKY.set_html('jky-machine-family'	, JKY.set_configs('Machine Families', '', ''));
	JKY.set_html('jky-machine-brand'	, JKY.set_configs('Machine Brands', JKY.App.get_prop('select'), ''));
	JKY.set_html('jky-app-select'		, JKY.set_configs('Machine Brands', JKY.App.get_prop('select'), 'All'));
	JKY.set_html('jky-app-select-label'	, JKY.t('Brand'));
	JKY.show('jky-app-select-line');
//	select the first option as default
	$('#jky-app-select option').eq(1).prop('selected', true);
	$('#jky-app-select').change();

	$('#jky-diameter'	).ForceIntegerOnly();
	$('#jky-width'		).ForceIntegerOnly();
	$('#jky-density'	).ForceIntegerOnly();
	$('#jky-inputs'		).ForceIntegerOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-name-s"	>' +				 the_row.name				+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.machine_brand	)	+ '</td>'
		+  '<td class="jky-td-integer"	>' +				 the_row.diameter			+ '</td>'
		+  '<td class="jky-td-integer"	>' +				 the_row.width				+ '</td>'
		+  '<td class="jky-td-integer"	>' +				 the_row.density			+ '</td>'
		+  '<td class="jky-td-integer"	>' +				 the_row.inputs				+ '</td>'
		+  '<td class="jky-td-name-l"	>' + JKY.fix_null	(the_row.lane_type		)	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-machine-name'		,				 the_row.name			);
	JKY.set_radio	('jky-machine-type'		,				 the_row.machine_type	);
	JKY.set_option	('jky-machine-family'	,				 the_row.machine_family	);
	JKY.set_option	('jky-machine-brand'	,				 the_row.machine_brand	);
	JKY.set_value	('jky-serial-number'	,				 the_row.serial_number	);
	JKY.set_value	('jky-diameter'			,				 the_row.diameter		);
	JKY.set_value	('jky-width'			,				 the_row.width			);
	JKY.set_value	('jky-density'			,				 the_row.density		);
	JKY.set_value	('jky-inputs'			,				 the_row.inputs			);
	JKY.set_value	('jky-lane-type'		,				 the_row.lane_type		);
	JKY.set_date	('jky-purchase-date'	, JKY.out_date	(the_row.purchase_date	));
	JKY.set_date	('jky-repair-date'		, JKY.out_date	(the_row.repair_date	));
	JKY.set_date	('jky-return-date'		, JKY.out_date	(the_row.return_date	));
	JKY.set_value	('jky-remarks'			, JKY.decode	(the_row.remarks		));
	JKY.display_cylinders();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-machine-name'		, '' );
	JKY.set_radio	('jky-machine-type'		,  JKY.t('Circular'));
	JKY.set_option	('jky-machine-family'	, '' );
	JKY.set_option	('jky-machine-brand'	, '' );
	JKY.set_value	('jky-serial-number'	, '' );
	JKY.set_value	('jky-diameter'			, '0');
	JKY.set_value	('jky-width'			, '0');
	JKY.set_value	('jky-density'			, '0');
	JKY.set_value	('jky-inputs'			, '0');
	JKY.set_value	('jky-lane-type'		, '' );
	JKY.set_date	('jky-purchase-date'	, '' );
	JKY.set_date	('jky-repair-date'		, '' );
	JKY.set_date	('jky-return-date'		, '' );
	JKY.set_value	('jky-remarks'			, '' );
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+              'name=\'' + JKY.get_value	('jky-machine-name'		) + '\''
		+    ', machine_type=\'' + JKY.get_checked	('jky-machine-type'		) + '\''
		+  ', machine_family=\'' + JKY.get_value	('jky-machine-family'	) + '\''
		+   ', machine_brand=\'' + JKY.get_value	('jky-machine-brand'	) + '\''
		+   ', serial_number=\'' + JKY.get_value	('jky-serial-number'	) + '\''
		+        ', diameter=\'' + JKY.get_value	('jky-diameter'			) + '\''
		+           ', width=\'' + JKY.get_value	('jky-width'			) + '\''
		+         ', density=\'' + JKY.get_value	('jky-density'			) + '\''
		+          ', inputs=\'' + JKY.get_value	('jky-inputs'			) + '\''
		+	    ', lane_type=\'' + JKY.get_value	('jky-lane-type'		) + '\''
		;
	my_set += ', purchase_date = ' + JKY.inp_date('jky-purchase-date'	);
	my_set +=   ', repair_date = ' + JKY.inp_date('jky-repair-date'		);
	my_set +=   ', return_date = ' + JKY.inp_date('jky-return-date'		);
	return my_set;
};

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'Cylinders'
		, where : 'machine_id = ' + the_id
		};
	JKY.ajax(true, my_data);
};

/* -------------------------------------------------------------------------- */
JKY.save_remarks = function() {
	var my_set	= 'remarks = \'' + JKY.get_value('jky-remarks') + '\'';
	var my_data =
		{ method: 'update'
		, table : 'Machines'
		, set	:  my_set
		, where : 'Machines.id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.save_remarks_success);
};

JKY.save_remarks_success = function(response) {
	JKY.display_message('Remarks saved, ' + response.message);
	JKY.row = JKY.get_row('Machines', JKY.row.id);
};

