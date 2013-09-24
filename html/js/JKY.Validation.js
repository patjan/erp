"use strict";
var JKY = JKY || {};
/**
 * JKY.Validation - process all validation functions
 *
 * require:	JKY.Utils.js
 */
JKY.Validation = function() {
	var my_row;
	var my_id;

	/**
	 *	process validation only inside of jky-form-data
	 */
	var my_is_loaded = function(the_dom_id) {
		if ($('#jky-form-data').find('#' + the_dom_id).length > 0
		&& (my_id == null || my_id == the_dom_id)) {
			return true;
		}else{
			return false;
		}
	}

	function my_is_invalid(the_row, the_id) {
		my_row	= the_row;
		my_id	= the_id ;

		var my_error = '';
		my_error += my_validate_name	('jky-nick-name'	, 'Nick Name'	, 'Contacts'	, 'nick_name'	);
		my_error += my_validate_name	('jky-user-name'	, 'User Name'	, 'Contacts'	, 'user_name'	);
		my_error += my_validate_name	('jky-full-name'	, 'Full Name'	, 'Contacts'	, 'full_name'	);
		my_error += my_validate_name	('jky-thread-name'	, 'Thread Name'	, 'Threads'		, 'name'		);
		my_error += my_validate_name	('jky-machine-name'	, 'Machine Name', 'Machines'	, 'name'		);
		my_error += my_validate_name	('jky-product-name'	, 'Product Name', 'Products'	, 'product_name');

//		my_error += my_validate_required		('jky-contact-company'	, 'Company'		);
		my_error += my_validate_required		('jky-first-name'		, 'First Name'	);
		my_error += my_validate_required		('jky-last-name'		, 'Last Name'	);
/*
		my_error += my_validate_required		('jky-contact-tag'		, 'Tag'			);
		my_error += my_validate_numeric			('jky-cnpj'				, 'CNPJ or CPF'	);
		my_error += my_validate_numeric			('jky-ie'				, 'IE or RG'	);
*/

		if (JKY.Application.get('program_name') == 'FTPs') {
			my_error += my_validate_numeric		('jky-diameter'			, 'Diameter'	);
			my_error += my_validate_numeric		('jky-density'			, 'Density'		);
			my_error += my_validate_numeric		('jky-inputs'			, 'Inputs'		);
			my_error += my_validate_numeric		('jky-speed'			, 'Speed'		);
			my_error += my_validate_numeric		('jky-turns'			, 'Turns'		);
			my_error += my_validate_numeric		('jky-weight'			, 'Weight'		);
			my_error += my_validate_numeric		('jky-width'			, 'Width'		);
			my_error += my_validate_numeric		('jky-lanes'			, 'Lanes'		);
			my_error += my_validate_numeric		('jky-elasticity'		, 'Elasticity'	);
			my_error += my_validate_required	('jky-needling'			, 'Needling'	);
			my_error += my_validate_numeric		('jky-peso'				, 'Peso'		);
		}

		if (JKY.is_empty(my_error)) {
			return false;
		}else{
			JKY.display_message(my_error);
			return true;
		}
	}

	function my_validate_numeric(the_dom_id, the_label) {
		if (my_is_loaded(the_dom_id)) {
			var my_value = JKY.get_value(the_dom_id);
//			if (JKY.is_empty(my_value) || JKY.is_numeric(my_value)) {
			if (JKY.is_numeric(my_value)) {
				return '';
			}else{
				return JKY.set_must_be_numeric(the_label);
			}
		}
		return '';
	}

	function my_validate_required(the_dom_id, the_label) {
		if (my_is_loaded(the_dom_id)) {
			var my_value = JKY.get_value(the_dom_id);
			if (JKY.is_empty(my_value)) {
				if (the_dom_id == 'jky-contact-company') {
					if (JKY.is_checked('jky-is-company')) {
						return '';
					}else{
						return JKY.set_is_required(the_label);
					}
				}else{
					return JKY.set_is_required(the_label);
				}
			}
		}
		return '';
	}

	function my_validate_name(the_dom_id, the_label, the_table_name, the_key_name) {
		if (JKY.has_class(the_dom_id, 'optional')) {
			return '';
		}

		if (my_is_loaded(the_dom_id)) {
/**
 * skip the validation for input with attr = readonly
 */
			if (JKY.has_attr(the_dom_id, 'readonly')) {
				return '';
			}
			var my_value = JKY.get_value(the_dom_id);
			if (JKY.is_empty(my_value)) {
				if (the_dom_id == 'jky-user-name') {
					return '';
				}else{
					return JKY.set_is_required(the_label);
				}
			}else{
				var my_found_id = JKY.get_id(the_table_name, the_key_name + ' = \'' + my_value + '\'');
//				if (JKY.is_empty(my_found_id) || (my_row != null && my_found_id == my_row.id)) {
				if(!my_found_id || (my_row != null && my_row.id == my_found_id)) {
					return '';
				}else{
					return JKY.set_already_taken(the_label);
				}
			}
		}
		return '';
	}

	return {version		:	'1.0.0'
		, is_invalid	:	function(the_row, the_id)		{return my_is_invalid(the_row, the_id);}
	};
}();
