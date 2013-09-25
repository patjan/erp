"use strict";

/**
 * threads.html
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Pieces Check In'
		, table_name	: 'Pieces'
		, specific		: ''
		, select		: 'All'
		, filter		: ''
		, sort_by		: 'Pieces.checkin_at'
		, sort_seq		: 'Desc'
		, focus			: 'jky-pieces-name'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-planning-pieces');
	JKY.set_side_active('jky-threads-checkin');
	JKY.set_html('jky-compositions'		, JKY.set_configs('Thread Compositions', '', ''));
	JKY.set_html('jky-thread-groups'	, JKY.set_configs('Thread Groups', '', ''));
	JKY.set_html('jky-app-select'		, JKY.set_configs('Thread Groups', JKY.App.get('select'), 'All'));
	JKY.set_html('jky-app-select-label', JKY.t('Group'));
	JKY.show('jky-app-select-line');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-barcode"				>' +	 the_row.name				+ '</td>'
		+  '<td class="jky-inspected-by"		>' +	 the_row.inspected_by		+ '</td>'
		+  '<td class="jky-weighed-by"			>' +	 the_row.weighed_by			+ '</td>'
		+  '<td class="jky-checkin-by"			>' +	 the_row.checkin_by			+ '</td>'
		+  '<td class="jky-checkin-location"	>' +	 the_row.checkin_location	+ '</td>'
		+  '<td class="jky-checkin-weight"		>' +	 the_row.checkin_weight		+ '</td>'
		+  '<td class="jky-remarks"				>' +	 the_row.remarks			+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-barcode'			, the_row.name				);
	JKY.set_value	('jky-inspector'		, the_row.inspector			);
	JKY.set_value	('jky-weigher'			, the_row.weigher			);
	JKY.set_value	('jky-product-name'		, the_row.product_name		);
	JKY.set_value	('jky-inspector-name'	, the_row.inspector_name	);
	JKY.set_value	('jky-weigher-name'		, the_row.weigher_name		);
	JKY.set_value	('jky-remarks'			, the_row.remarks			);
	JKY.set_value	('jky-weight'			, the_row.weight			);
	JKY.set_value	('jky-location'			, the_row.location			);

};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-barcode'			, '' );
	JKY.set_value	('jky-inspector'		, '' );
	JKY.set_value	('jky-weigher'			, '' );
	JKY.set_value	('jky-product-name'		, '' );
	JKY.set_value	('jky-inspector-name'	, '' );
	JKY.set_value	('jky-weigher-name'		, '' );
	JKY.set_value	('jky-remarks'			, '' );
	JKY.set_value	('jky-weight'			, '' );
	JKY.set_value	('jky-loaction'			, '' );
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+   ', barcode=\'' + JKY.get_value	('jky-barcode'		) + '\''
		+   'inspector=\'' + JKY.get_value	('jky-inspector'	) + '\''
		+	', weigher=\'' + JKY.get_value	('jky-weigher'			) + '\''
	;
	return my_set;
};
