"use strict";

/**
 * machines.html
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
		, focus			: 'jky-name'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-purchase-date'		).datepicker();
	$('#jky-repair-date'		).datepicker();
	$('#jky-return-date'		).datepicker();
	$('#jky-cylinder-add-new'	).click (function() {JKY.insert_cylinder	();});
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_menu_active('jky-menu-production');
	JKY.set_side_active('jky-production-machines');
	JKY.set_html('jky-machine-family'	, JKY.set_configs('Machine Families', '', ''));
	JKY.set_html('jky-machine-brand'	, JKY.set_configs('Machine Brands'  , '', ''));
	JKY.show('jky-side-production'	);
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-name"			>' + the_row.name			+ '</td>'
		+  '<td class="jky-diameter"		>' + the_row.diameter		+ '</td>'
		+  '<td class="jky-width"			>' + the_row.width			+ '</td>'
		+  '<td class="jky-density"			>' + the_row.density		+ '</td>'
		+  '<td class="jky-inputs"			>' + the_row.inputs			+ '</td>'
		+  '<td class="jky-lanes"			>' + the_row.lanes			+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-name'				, the_row.name			);
	JKY.set_radio	('jky-machine-type'		, the_row.machine_type	);
	JKY.set_option	('jky-machine-family'	, the_row.machine_family);
	JKY.set_option	('jky-machine-brand'	, the_row.machine_brand	);
	JKY.set_value	('jky-serial-number'	, the_row.serial_number	);
	JKY.set_value	('jky-diameter'			, the_row.diameter		);
	JKY.set_value	('jky-width'			, the_row.width			);
	JKY.set_value	('jky-density'			, the_row.density		);
	JKY.set_value	('jky-inputs'			, the_row.inputs		);
	JKY.set_value	('jky-lanes'			, the_row.lanes			);
	JKY.set_value	('jky-purchase-value'	, JKY.fix_ymd2dmy(the_row.purchase_date	));
	JKY.set_value	('jky-repair-value'		, JKY.fix_ymd2dmy(the_row.repair_date	));
	JKY.set_value	('jky-return-value'		, JKY.fix_ymd2dmy(the_row.return_date	));
	JKY.display_cylinders();
}

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-name'				, '' );
	JKY.set_radio	('jky-machine-type'		,  JKY.t('Circular'));
	JKY.set_option	('jky-machine-family'	, '' );
	JKY.set_option	('jky-machine-brand'	, '' );
	JKY.set_value	('jky-serial-number'	, '' );
	JKY.set_value	('jky-diameter'			, '0');
	JKY.set_value	('jky-width'			, '0');
	JKY.set_value	('jky-density'			, '0');
	JKY.set_value	('jky-inputs'			, '0');
	JKY.set_value	('jky-lanes'			, '0');
	JKY.set_value	('jky-purchase-value'	, '' );
	JKY.set_value	('jky-repair-value'		, '' );
	JKY.set_value	('jky-return-value'		, '' );
}


/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+            'name=\'' + JKY.get_value	('jky-name'				) + '\''
		+  ', machine_type=\'' + JKY.get_checked('jky-machine-type'		) + '\''
		+ ', machine_family=\'' + JKY.get_value	('jky-machine-family'	) + '\''
		+ ', machine_brand=\'' + JKY.get_value	('jky-machine-brand'	) + '\''
		+ ', serial_number=\'' + JKY.get_value	('jky-serial-number'	) + '\''
		+      ', diameter=\'' + JKY.get_value	('jky-diameter'			) + '\''
		+         ', width=\'' + JKY.get_value	('jky-width'			) + '\''
		+       ', density=\'' + JKY.get_value	('jky-density'			) + '\''
		+        ', inputs=\'' + JKY.get_value	('jky-inputs'			) + '\''
		+	      ', lanes=\'' + JKY.get_value	('jky-lanes'			) + '\''
		;
	my_set += ', purchase_date = ' + JKY.fix_dmy2ymd(JKY.get_value('jky-purchase-value'	));
	my_set +=   ', repair_date = ' + JKY.fix_dmy2ymd(JKY.get_value('jky-repair-value'	));
	my_set +=   ', return_date = ' + JKY.fix_dmy2ymd(JKY.get_value('jky-return-value'	));
	return my_set;

};

JKY.display_form = function() {
};

JKY.process_insert = function(the_id) {
};

JKY.process_update = function(the_id, the_row) {
};

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'Cylinders'
		, where : 'machine_id = ' + the_id
		};
	JKY.ajax(true, my_data);
};

