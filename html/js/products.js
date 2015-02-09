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
	$('#jky-start-date	input'	).attr('data-format', JKY.Session.get_date_time());
	$('#jky-start-date'			).datetimepicker({language:JKY.Session.get_locale()});

//	$('#jky-ftp-add-new'		).click (function() {JKY.insert_product	();});
	$('#jky-tab-prices'			).click (function() {JKY.display_prices	();});
	$('#jky-tab-finishings'		).click (function()	{JKY.Finishings.display(JKY.row.finishings	);});
	$('#jky-tab-washings'		).click (function()	{JKY.Washings  .display(JKY.row.washings	);});
	$('#jky-tab-ftps'			).click (function() {JKY.display_ftps	();});
	$('#jky-tab-history'		).click (function() {JKY.History.display();});
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

	$('#jky-product-filter').KeyUpDelay(JKY.Product.load_data);

	$('#jky-peso'		).ForceNumericOnly();
	$('#jky-units'		).ForceIntegerOnly();
	$('#jky-yield'		).ForceNumericOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-thumb"	>' + JKY.fix_thumb	(the_row.photo, the_row.id, 'products') + '</td>'
		+  '<td class="jky-td-name-w"	>' +				 the_row.product_name		+ '</td>'
		+  '<td class="jky-td-name-l"	>' + JKY.fix_null	(the_row.parent_name	)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 the_row.product_type		+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.out_count	(the_row.finishings		)	+ '</td>'
		+  '<td class="jky-td-number"	>' +				 the_row.peso				+ '</td>'
		+  '<td class="jky-td-number"	>' +				 the_row.units				+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.short_date	(the_row.start_at		)	+ '</td>'
		+  '<td class="jky-td-status"	>' +				 the_row.status				+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_html	('jky-status'			, JKY.t			(the_row.status				));
	JKY.set_value	('jky-product-name'		,				 the_row.product_name		);
	JKY.set_value	('jky-parent-id'		,				 the_row.parent_id			);
	JKY.set_value	('jky-product-base'		,				 the_row.parent_name		);
	JKY.set_radio	('jky-product-type'		,				 the_row.product_type		);
	JKY.set_date	('jky-start-date'		, JKY.out_time	(the_row.start_at			));
	JKY.set_value	('jky-peso'				,				 the_row.peso				);
	JKY.set_value	('jky-units'			,				 the_row.units				);
	JKY.set_value	('jky-yield'			,				 the_row.yield				);
	JKY.set_value	('jky-weight-customer'	,				 the_row.weight_customer	);
	JKY.set_value	('jky-weight-dyer'		,				 the_row.weight_dyer		);
	JKY.set_value	('jky-width-customer'	,				 the_row.width_customer		);
	JKY.set_value	('jky-width-dyer'		,				 the_row.width_dyer			);

	JKY.Photo.set_row_id(the_row.id);
	JKY.set_html('jky-download-photo'	, JKY.Photo.out_photo(the_row.photo));
	JKY.set_html('jky-upload-name'		, '');
	JKY.set_html('jky-upload-percent'	, '');
	JKY.set_css ('jky-upload-progress'	, 'width', '0%');

	if ($('#jky-tab-prices'		).hasClass('active'))	JKY.display_prices();
	if ($('#jky-tab-finishings'	).hasClass('active'))	JKY.Finishings	.display(the_row.finishings	);
	if ($('#jky-tab-washings'	).hasClass('active'))	JKY.Washings	.display(the_row.washings	);
	if ($('#jky-tab-ftps'		).hasClass('active'))	JKY.display_ftps();
	if ($('#jky-tab-history'	).hasClass('active'))	JKY.History		.display();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-product-name'		, '');
	JKY.set_value	('jky-parent-id'		, '');
	JKY.set_value	('jky-product-base'		, '');
	JKY.set_radio	('jky-product-type'		,  JKY.t('Tubular'));
	JKY.set_date	('jky-start-date'		,  JKY.out_time(JKY.get_now()));
	JKY.set_value	('jky-peso'				, '0');
	JKY.set_value	('jky-units'			, '1');
	JKY.set_value	('jky-yield'			, '0');
	JKY.set_value	('jky-weight-customer'	, '');
	JKY.set_value	('jky-weight-dyer'		, '');
	JKY.set_value	('jky-width-customer'	, '');
	JKY.set_value	('jky-width-dyer'		, '');
	JKY.set_value	('jky-finishings'		, '');
	JKY.set_value	('jky-washings'			, '');
};


/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_parent_id = JKY.get_value('jky-parent-id');
//	to clean up Product Base, just select Product Base = Product Name
	if (JKY.row != null && my_parent_id == JKY.row.id)	my_parent_id = null;
	if (my_parent_id == '')								my_parent_id = null;

	var my_set = ''
		+      'product_name=\'' + JKY.get_value	('jky-product-name'		) + '\''
		+       ', parent_id=  ' + my_parent_id
		+    ', product_type=\'' + JKY.get_checked	('jky-product-type'		) + '\''
		+        ', start_at=  ' + JKY.inp_time		('jky-start-date'		)
		+		     ', peso=  ' + JKY.get_value	('jky-peso'				)
		+		    ', units=  ' + JKY.get_value	('jky-units'			)
		+           ', yield=  ' + JKY.get_value	('jky-yield'			)
		+ ', weight_customer=\'' + JKY.get_value	('jky-weight-customer'	) + '\''
		+     ', weight_dyer=\'' + JKY.get_value	('jky-weight-dyer'		) + '\''
		+  ', width_customer=\'' + JKY.get_value	('jky-width-customer'	) + '\''
		+      ', width_dyer=\'' + JKY.get_value	('jky-width-dyer'		) + '\''
		;
	return my_set;
};

JKY.reset_product_base = function() {
	var my_parent_id = JKY.get_value('jky-parent-id');
	if (JKY.is_empty(my_parent_id))		return;
	JKY.set_value('jky-parent-id'	, '');
	JKY.set_value('jky-product-base', '');
	$('#jky-product-base').change();	//	to activate change event
}