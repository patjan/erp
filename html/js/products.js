"use strict";

/**
 * products.html
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Products'
		, table_name	: 'Products'
		, specific		: ''
		, select		: 'Tubular'
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
		$('#jky-action-comment'		).click (function() {JKY.process_comment	();});	// not done
		$('#jky-start-date'			).datepicker();
//		$('#jky-cylinder-add-new'	).click (function() {JKY.insert_cylinder	();});
	};

/**
 *	set initial values (run only once per load)
 */
	JKY.set_initial_values = function() {
	JKY.set_menu_active('jky-menu-production');
	JKY.set_side_active('jky-production-products');
	JKY.set_html('jky-app-select'		, JKY.set_group_set('Configs',  JKY.App.get('select'), 'Product Types', 'All'));
	JKY.set_html('jky-priority'			, JKY.set_group_set('Controls', '', 'Priorities'			));
	JKY.set_html('jky-category'			, JKY.set_group_set('Controls', '', 'Ticket Categories'		));
	JKY.show('jky-side-production'	);
	JKY.show('jky-app-header'		);
	setTimeout(function() {JKY.set_option('jky-app-select', JKY.App.get('select'))}, 100);
	};
/**
 *	set table row
 */
	JKY.set_table_row = function(the_row) {
		var my_html = ''
			+  '<td class="jky-name"			>' + the_row.name			+ '</td>'
			+  '<td class="jky-product-type"	>' + the_row.product_type	+ '</td>'
			;
		return my_html;
	};
/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-name'				, the_row.name			);
	JKY.set_radio	('jky-product-type'		, the_row.product_type	);
	JKY.set_value	('jky-start-value'		, JKY.fix_ymd2dmy(the_row.start_date	));

	JKY.Photo.set_row_id(the_row.id);
	var my_time = new Date();
	var my_html = '';
	if (the_row.photo == null) {
		my_html = '<img id="jky-photo-img" src="/img/placeholder.png" class="the_icon" />';
	}else{
		my_html = '<a href="' + 'jky_download.php?file_name=products/' + the_row.id + '.' + the_row.photo + '">'
				+ '<img id="jky-photo-img"    src="/uploads/products/' + the_row.id + '.' + the_row.photo + '?time=' + my_time.getTime() + '" class="the_icon" />';
				+ '</a>'
				;
	}
	JKY.set_html('jky-download-photo'	, my_html);
	JKY.set_html('jky-upload-name'		, '');
	JKY.set_html('jky-upload-percent'	, '');
	JKY.set_css ('jky-upload-progress'	, 'width', '0%');
}

	JKY.get_form_set = function() {
		var my_set = ''
		+            'name=\'' + JKY.get_value	('jky-name'				) + '\''
		+  ', product_type=\'' + JKY.get_checked('jky-product-type'		) + '\''
			;
	my_set +=    ', start_date = ' + JKY.fix_dmy2ymd(JKY.get_value('jky-start-value'	));
		return my_set;

};

JKY.display_form = function() {
};

JKY.process_insert = function(the_id) {
};

JKY.process_update = function(the_id, the_row) {
	};

JKY.process_delete = function(the_id, the_row) {
	};

