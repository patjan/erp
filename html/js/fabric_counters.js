"use strict";

/**
 * fabric_counters.html
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Fabric Counters'
		, table_name	: 'FabricCounters'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'product_name, color_name'
		, sort_seq		: 'ASC'
		, sort_list		: [[1, 0],[2, 0],[3,0]]
		, focus			: 'jky-product-name'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-reference-date	input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-reference-date'	).datetimepicker({language: JKY.Session.get_locale()});

	$('#jky-action-refresh'	).click (function() {JKY.process_refresh();});

	JKY.set_side_active('jky-receiving-counters');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
//	JKY.set_html('jky-compositions'		, JKY.set_configs('Fabric Compositions', '', ''));
//	JKY.set_html('jky-fabric-groups'	, JKY.set_configs('Fabric Groups', '', ''));
//	JKY.set_html('jky-app-select'		, JKY.set_configs('Product Types', JKY.App.get_prop('select'), 'All'));
//	JKY.set_html('jky-app-select-label', JKY.t('Type'));
//	JKY.show('jky-app-select-line');
//	select the first option as default
//	$('#jky-app-select option').eq(1).prop('selected', true);
//	$('#jky-app-select').change();

//	JKY.hide('jky-action-add-new');
	JKY.hide('jky-action-form' );
	JKY.set_date('jky-reference-date', JKY.out_time(JKY.get_config_value('System Controls', 'Calculate Fabric Date Time')));
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	JKY.show('jky-action-print');
	var my_html = ''
//		+  '<td class="jky-td-name-s"	>' + the_row.product_type		+ '</td>'
		+  '<td class="jky-td-name-w"	>' + the_row.product_name		+ '</td>'
		+  '<td class="jky-td-name-l"	>' + the_row.color_name			+ '</td>'
		+  '<td class="jky-td-pieces"	>' + the_row.scheduled			+ '</td>'
		+  '<td class="jky-td-pieces"	>' + the_row.produced			+ '</td>'
		+  '<td class="jky-td-pieces"	>' + the_row.dyers				+ '</td>'
		+  '<td class="jky-td-pieces"	>' + the_row.climate			+ '</td>'
		+  '<td class="jky-td-pieces"	>' + the_row.stock				+ '</td>'
		+  '<td class="jky-td-pieces"	>' + the_row.total				+ '</td>'
		+  '<td class="jky-td-pieces"	>' + the_row.target				+ '</td>'
		+  '<td class="jky-td-pieces"	>' + the_row.hold				+ '</td>'
		+  '<td class="jky-td-pieces"	>' + the_row.sold				+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-ncm'				, the_row.ncm			);
	JKY.set_value	('jky-product-name'		, the_row.name			);
	JKY.set_option	('jky-fabric-groups'	, the_row.product_type	);
//	JKY.set_value	('jky-fabric-color'		, the_row.fabric_color	);
	JKY.set_option	('jky-compositions'		, the_row.composition	);
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-ncm'				, '' );
	JKY.set_value	('jky-product-name'		, '' );
	JKY.set_option	('jky-fabric-groups'	, '' );
//	JKY.set_value	('jky-fabric-color'		, '0');
	JKY.set_option	('jky-compositions'		, '0');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+            ' ncm=\'' + JKY.get_value	('jky-ncm'				) + '\''
		+          ', name=\'' + JKY.get_value	('jky-product-name'		) + '\''
		+  ', product_type=\'' + JKY.get_value	('jky-fabric-groups'	) + '\''
//		+  ', fabric_color=\'' + JKY.get_value	('jky-fabric-color'		) + '\''
		+   ', composition=\'' + JKY.get_value	('jky-compositions'		) + '\''
		;
	return my_set;
};

/**
 *	get form set
 */
JKY.process_refresh = function() {
	JKY.show('jky-loading');
	var my_reference_date = JKY.inp_date('jky-reference-date');
	var my_data =
		{ method		: 'refresh'
		, table			: 'FabricCounters'
		, reference_date: my_reference_date
		};
	JKY.ajax(true, my_data, function() {
		JKY.set_date('jky-reference-date', JKY.out_time(JKY.get_config_value('System Controls', 'Calculate Fabric Date Time')));
		JKY.App.display_list();
	})
};
