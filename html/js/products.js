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
		, sort_by		: 'product_name'
		, sort_seq		: 'ASC'
		, focus			: 'jky-product-name'
		});
	JKY.App.init();

	JKY.Photo = JKY.Upload(
		{ object_name	: 'JKY.Photo'
		, table_name	: 'Contacts'
		, directory		: 'contacts'
		, field_name	: 'photo'
		, title			: 'Photo files'
		, extensions	: 'jpg,gif,png'
		, button_id		: 'jky-upload-photo'
		, filename_id	: 'jky-upload-name'
		, percent_id	: 'jky-upload-percent'
		, progress_id	: 'jky-upload-progress'
		, img_id		: 'jky-photo-img'
		, download_id	: 'jky-download-photo'
		});
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-start-date'			).datepicker();
//	$('#jky-cylinder-add-new'	).click (function() {JKY.insert_cylinder	();});
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_menu_active('jky-menu-production');
	JKY.set_side_active('jky-production-products');
	JKY.set_html('jky-app-select'		, JKY.set_group_set('Configs',  JKY.App.get('select'), 'Product Types', 'All'));
	JKY.show('jky-side-production');
	JKY.show('jky-app-header');
	setTimeout(function() {JKY.set_option('jky-app-select', JKY.App.get('select'))}, 100);
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-product-name"	>' + the_row.product_name	+ '</td>'
		+  '<td class="jky-product-type"	>' + the_row.product_type	+ '</td>'
		+  '<td class="jky-start-date"		>' + the_row.start_date		+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-product-name'				, the_row.product_name			);
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
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-product-name'				, '');
	JKY.set_radio	('jky-product-type'		,  JKY.t('Tubular'));
	JKY.set_value	('jky-start-value'		, '' );
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+  'product_name=\'' + JKY.get_value	('jky-product-name'		) + '\''
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

