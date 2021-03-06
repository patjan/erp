"use strict";

/**
 * ftps.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'FTPs'
		, table_name	: 'FTPs'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'ftp_number'
		, sort_seq		: 'DESC'
		, sort_list		: [[1, 1]]
		, sort_false	: 2						//	thumb
		, focus			: 'jky-diameter'
		, add_new		: 'display form'
		});
	JKY.App.init();

	JKY.Photo = JKY.Upload(
		{ object_name	: 'JKY.Photo'
		, table_name	: 'FTPs'
		, directory		: 'ftp_photos'
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

	JKY.Draw = JKY.Upload(
		{ object_name	: 'JKY.Draw'
		, table_name	: 'FTPs'
		, directory		: 'ftp_draws'
		, field_name	: 'draw'
		, title			: 'Drawing files'
		, extensions	: 'jpg,gif,pdf,png,xls,xml'
		, button_id		: 'jky-upload-drawing'
		, filename_id	: 'jky-upload-name'
		, percent_id	: 'jky-upload-percent'
		, progress_id	: 'jky-upload-progress'
		, img_id		: 'jky-drawing-img'
		, download_id	: 'jky-download-drawing'
		});
};

JKY.materials	= [];
JKY.threads		= [];
JKY.loads		= [];
JKY.settings	= [];
JKY.suppliers	= [];

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-start-date	input'	).attr('data-format', JKY.Session.get_date());
	$('#jky-start-date'			).datetimepicker({language:JKY.Session.get_locale(), pickTime:false});

	$('#jky-tab-threads'		).click (function() {JKY.display_threads	();});
	$('#jky-tab-loads'			).click (function() {JKY.display_loads		();});
	$('#jky-tab-settings'		).click (function() {JKY.display_settings	();});

	$('#jky-comp-add-new'		).click (function() {JKY.insert_composition	();});
	$('#jky-thread-add-new'		).click (function() {JKY.insert_thread		();});
	$('#jky-load-add-new'		).click (function() {JKY.insert_load		();});

//	$('#jky-action-product'		).click (function() {JKY.display_product	();});
	$('#jky-action-product'		).click (function() {JKY.Product.display(this);});
//	$('#jky-search-add-new'		).click (function()	{JKY.add_new_product	();});
//	$('#jky-search-filter'		).KeyUpDelay(JKY.filter_product);
//	$('#jky-thread-filter'		).KeyUpDelay(JKY.Thread.load_data);

	JKY.set_side_active('jky-production-ftps');
}

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-product'	, '../JKY.Search.Product.html'	);
	JKY.append_file('jky-load-thread'	, '../JKY.Search.Thread	.html'	);

	JKY.set_html('jky-machine-name', JKY.set_table_options('Machines', 'name', '', ''));
	JKY.set_html('jky-collection', JKY.set_configs('Collections', '', ''));
	JKY.set_html('jky-app-select', JKY.set_configs('Collections', JKY.App.get_prop('select'), 'All'));
	JKY.set_html('jky-app-select-label', JKY.t('Collection'));
	JKY.show('jky-app-select-line');

//	select the first option as default
	if (JKY.is_empty($('#jky-app-filter').val())) {
		$('#jky-app-select option').eq(1).prop('selected', true);
		$('#jky-app-select').change();
	}

	JKY.materials	= JKY.get_configs	('Materials'	);
	JKY.threads		= JKY.get_ids		('Threads'		);
	JKY.settings	= JKY.get_configs	('Settings'		);
	JKY.suppliers	= JKY.get_companies	('is_supplier'	);

	$('#jky-product-filter'		).KeyUpDelay(JKY.Product.load_data	);
	$('#jky-thread-filter'		).KeyUpDelay(JKY.Thread.load_data	);

	$('#jky-diameter'	).ForceIntegerOnly();
	$('#jky-density'	).ForceIntegerOnly();
	$('#jky-inputs'		).ForceIntegerOnly();
	$('#jky-turns'		).ForceIntegerOnly();
	$('#jky-weight'		).ForceIntegerOnly();
	$('#jky-width'		).ForceIntegerOnly();
	$('#jky-speed'		).ForceIntegerOnly();
	$('#jky-peso'		).ForceNumericOnly();
}

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-number"	>'	+				 the_row.ftp_number			+ '</td>'
		+  '<td class="jky-td-thumb"	>'	+ JKY.fix_thumb	(the_row.photo, the_row.id, 'ftp_photos') + '</td>'
		+  '<td class="jky-td-name-w"	>'	+ JKY.fix_null	(the_row.product_name	)	+ '</td>'
		+  '<td class="jky-td-name-s"	>'	+ JKY.fix_null	(the_row.nick_name		)	+ '</td>'
		+  '<td class="jky-td-name-s"	>'	+ JKY.fix_null	(the_row.machine_name	)	+ '</td>'
		+  '<td class="jky-td-name-l"	>'	+				 the_row.composition		+ '</td>'
		+  '</tr>'
		;
	return my_html;
}

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-ftp-number'		, the_row.ftp_number	);
	JKY.set_date	('jky-start-date'		, JKY.out_date(the_row.start_date));
	JKY.set_value	('jky-product-id'		, the_row.product_id	);
	JKY.set_value	('jky-product-name'		, the_row.product_name	);
	JKY.set_value	('jky-composition'		, the_row.composition	);
	JKY.set_option	('jky-machine-name'		, the_row.machine_id	);
	JKY.set_value	('jky-collection'		, the_row.collection	);
	JKY.set_value	('jky-nick-name'		, the_row.nick_name		);
	JKY.set_value	('jky-diameter'			, the_row.diameter		);
	JKY.set_value	('jky-density'			, the_row.density		);
	JKY.set_value	('jky-inputs'			, the_row.inputs		);
	JKY.set_value	('jky-turns'			, the_row.turns			);
	JKY.set_value	('jky-weight'			, the_row.weight		);
	JKY.set_value	('jky-width'			, the_row.width			);
//	JKY.set_value	('jky-lanes'			, the_row.lanes			);
//	JKY.set_value	('jky-elasticity'		, the_row.elasticity	);
//	JKY.set_value	('jky-needling'			, the_row.needling		);
	JKY.set_value	('jky-speed'			, the_row.speed			);
	JKY.set_value	('jky-peso'				, the_row.peso			);
	JKY.set_radio	('jky-has-break'		, the_row.has_break		);

	JKY.Photo.set_row_id(the_row.id);
	JKY.Draw .set_row_id(the_row.id);
	JKY.set_html('jky-download-photo'	, JKY.Photo.out_photo(the_row.photo));
	JKY.set_html('jky-download-drawing'	, JKY.Draw .out_photo(the_row.draw ));

	JKY.set_html('jky-upload-name'		, '');
	JKY.set_html('jky-upload-percent'	, '');
	JKY.set_css ('jky-upload-progress'	, 'width', '0%');

	JKY.display_composition();
	JKY.display_threads();
	JKY.display_loads();
	JKY.display_settings();
}

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-ftp-number'		,  JKY.t('New'));
	JKY.set_date	('jky-start-date'		,  JKY.out_date(JKY.get_date()));
	JKY.set_value	('jky-product-id'		,  0);
	JKY.set_value	('jky-product-name'		, '');
	JKY.set_value	('jky-composition'		, '');
	JKY.set_option	('jky-machine-name'		,  null);
	JKY.set_value	('jky-diameter'			, '');
	JKY.set_value	('jky-density'			, '');
	JKY.set_value	('jky-inputs'			, '');
	JKY.set_value	('jky-turns'			, '');
	JKY.set_value	('jky-weight'			, '');
	JKY.set_value	('jky-width'			, '');
//	JKY.set_value	('jky-lanes'			, '');
//	JKY.set_value	('jky-elasticity'		, '');
//	JKY.set_value	('jky-needling'			, '');
	JKY.set_value	('jky-speed'			, '');
	JKY.set_value	('jky-peso'				, '12.5');
	JKY.set_radio	('jky-has-break'		, 'No');
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_machine_id = JKY.get_value('jky-machine-name');
	my_machine_id = (my_machine_id == '') ? 'null' : my_machine_id;

	var my_set = ''
		+      'product_id=  ' + JKY.get_value	('jky-product-id'		)
		+    ', start_date=  ' + JKY.inp_date	('jky-start-date'		)
		+    ', machine_id=  ' + my_machine_id
		+    ', collection=\'' + JKY.get_value	('jky-collection'		) + '\''
		+     ', nick_name=\'' + JKY.get_value	('jky-nick-name'		) + '\''
		+      ', diameter=  ' + JKY.get_value	('jky-diameter'			)
		+       ', density=  ' + JKY.get_value	('jky-density'			)
		+        ', inputs=  ' + JKY.get_value	('jky-inputs'			)
		+         ', turns=  ' + JKY.get_value	('jky-turns'			)
		+        ', weight=  ' + JKY.get_value	('jky-weight'			)
		+         ', width=  ' + JKY.get_value	('jky-width'			)
//		+         ', lanes=  ' + JKY.get_value	('jky-lanes'			)
//		+    ', elasticity=  ' + JKY.get_value	('jky-elasticity'		)
//		+      ', needling=\'' + JKY.get_value	('jky-needling'			) + '\''
		+         ', speed=  ' + JKY.get_value	('jky-speed'			)
		+		   ', peso=  ' + JKY.get_value	('jky-peso'				)
		+     ', has_break=\'' + JKY.get_checked('jky-has-break'		) + '\''
		;
	return my_set;
}

JKY.display_list = function() {
	JKY.show('jky-action-print');
};

JKY.display_form = function() {
	JKY.show('jky-action-print');
	JKY.show('jky-action-copy');
};

JKY.process_validation = function() {
	var my_error = '';
	my_error += JKY.Validation.is_numeric	('jky-diameter'			, 'Diameter'	);
	my_error += JKY.Validation.is_numeric	('jky-density'			, 'Density'		);
	my_error += JKY.Validation.is_numeric	('jky-inputs'			, 'Inputs'		);
	my_error += JKY.Validation.is_numeric	('jky-turns'			, 'Turns'		);
	my_error += JKY.Validation.is_numeric	('jky-weight'			, 'Weight'		);
	my_error += JKY.Validation.is_numeric	('jky-width'			, 'Width'		);
	my_error += JKY.Validation.is_numeric	('jky-speed'			, 'Speed'		);
//	my_error += JKY.Validation.is_numeric	('jky-lanes'			, 'Lanes'		);
//	my_error += JKY.Validation.is_numeric	('jky-elasticity'		, 'Elasticity'	);
//	my_error += JKY.Validation.is_required	('jky-needling'			, 'Needling'	);
	my_error += JKY.Validation.is_numeric	('jky-peso'				, 'Peso'		);
	return my_error;
}

JKY.process_copy = function(the_id, the_row) {
//	var my_set	= 'composition =\'' + the_row.composition	+ '\'';
	if (the_row.draw != null) {
		my_set += ', draw =\'' + the_row.draw + '\'';
	}
	if (the_row.photo != null) {
		my_set += ', photo =\'' + the_row.photo + '\'';
	}
	var my_data = {method:'update', table:'FTPs', set:my_set, where:'id = ' + the_id};
	JKY.ajax(true, my_data);

	my_data = {method:'copy', table:'FTPs', folder:'ftp_draws' , from:the_row.id, to:the_id};
	JKY.ajax(true, my_data);

	my_data = {method:'copy', table:'FTPs', folder:'ftp_photos', from:the_row.id, to:the_id};
	JKY.ajax(true, my_data);

//	JKY.copy_threads	(the_row.id, the_id);
//	JKY.copy_loads		(the_row.id, the_id);
	JKY.copy_settings	(the_row.id, the_id);

}

JKY.process_delete = function(the_id, the_row) {
	JKY.delete_threads	(the_id);
	JKY.delete_loads	(the_id);
	JKY.delete_settings	(the_id);
};

/**
 * print row
 */
JKY.print_row = function(the_id) {
	JKY.print_ftp(the_id);
}
