"use strict";

/**
 * products.js
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
		, select		: ''
		, filter		: ''
		, sort_by		: 'product_name'
		, sort_seq		: 'ASC'
		, sort_list		: [[1, 0]]
		, sort_false	: 1						//	thumb
		, focus			: 'jky-product-name'
		, add_new		: 'display form'
		});
	JKY.App.init();

	JKY.Photo = JKY.Upload(
		{ object_name	: 'JKY.Photo'
		, table_name	: 'Products'
		, directory		: 'products'
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
	$('#jky-action-change'		).click( function() {JKY.App.change_status(JKY.row.id);});
	$('#jky-start-date	input'	).attr('data-format', JKY.Session.get_date());
	$('#jky-start-date'			).datetimepicker({language:JKY.Session.get_locale(), pickTime:false});

//	$('#jky-tab-ftps'			).click (function() {JKY.display_ftps	();});
//	$('#jky-ftp-add-new'		).click (function() {JKY.insert_ftp		();});
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-sales-products');
	JKY.set_side_active('jky-planning-products');
	JKY.set_side_active('jky-production-products');
	JKY.set_html('jky-product-type'		, JKY.set_radios_array('jky-product-type', JKY.get_configs('Product Types')));
	JKY.set_html('jky-app-select'		, JKY.set_configs('Product Types', JKY.App.get('select'), 'All'));
	JKY.set_html('jky-app-select-label'	, JKY.t('Type'));
	JKY.show('jky-app-select-line');
//	select the last option type as default
	$('#jky-app-select option:last-child').prop('selected', true);
	$('#jky-app-select').change();

	$('#jky-product-filter'		).KeyUpDelay(JKY.Product.load_data	);
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-thumb"	>'	+ JKY.fix_thumb	(the_row.photo, the_row.id, 'products') + '</td>'
		+  '<td class="jky-td-name-w"	>'	+				 the_row.product_name	+ '</td>'
		+  '<td class="jky-td-name-l"	>'	+ JKY.fix_null	(the_row.parent_name)	+ '</td>'
		+  '<td class="jky-td-name-s"	>'	+				 the_row.product_type	+ '</td>'
		+  '<td class="jky-td-name-s"	>'	+ JKY.fix_null	(the_row.finishing)		+ '</td>'
		+  '<td class="jky-td-number"	>'	+				 the_row.peso			+ '</td>'
		+  '<td class="jky-td-number"	>'	+				 the_row.units			+ '</td>'
		+  '<td class="jky-td-date"		>'	+ JKY.out_date	(the_row.start_date)	+ '</td>'
		+  '<td class="jky-td-status"	>'	+				 the_row.status			+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_html	('jky-status'			, JKY.t			(the_row.status				));
	JKY.set_value	('jky-product-name'		,				 the_row.product_name		);
	JKY.set_value	('jky-product-base'		,				 the_row.parent_name		);
	JKY.set_radio	('jky-product-type'		,				 the_row.product_type		);
	JKY.set_value	('jky-finishing'		,				 the_row.finishing			);
	JKY.set_value	('jky-peso'				,				 the_row.peso				);
	JKY.set_value	('jky-units'			,				 the_row.units				);
	JKY.set_date	('jky-start-date'		, JKY.out_date	(the_row.start_date			));

	JKY.Photo.set_row_id(the_row.id);
	JKY.set_html('jky-download-photo'	, JKY.Photo.out_photo(the_row.photo));
	JKY.set_html('jky-upload-name'		, '');
	JKY.set_html('jky-upload-percent'	, '');
	JKY.set_css ('jky-upload-progress'	, 'width', '0%');

	JKY.display_prices();
	JKY.display_ftps();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-product-name'		, '');
	JKY.set_value	('jky-product-base'		, '');
	JKY.set_radio	('jky-product-type'		,  JKY.t('Tubular'));
	JKY.set_value	('jky-finishing'		, '');
	JKY.set_value	('jky-peso'				, '0');
	JKY.set_value	('jky-units'			, '1');
	JKY.set_date	('jky-start-date'		,  JKY.out_date(JKY.get_date()));
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_parent_id = JKY.get_value('jky-parent-id');
//	to clean up Product Base, just select Product Base = Product Name
	if (JKY.row != null &&  my_parent_id == JKY.row.id) {
		my_parent_id = null;
	}
	if (my_parent_id == '') {
		my_parent_id = null;
	}

	var my_set = ''
		+    'product_name=\'' + JKY.get_value	('jky-product-name'	) + '\''
		+     ', parent_id=  ' + my_parent_id
		+  ', product_type=\'' + JKY.get_checked('jky-product-type'	) + '\''
		+     ', finishing=\'' + JKY.get_value	('jky-finishing'	) + '\''
		+		   ', peso=  ' + JKY.get_value	('jky-peso'			)
		+		  ', units=  ' + JKY.get_value	('jky-units'		)
		+    ', start_date=  ' + JKY.inp_date	('jky-start-date'	)
		;
	return my_set;
};
