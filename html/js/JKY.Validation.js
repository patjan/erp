"use strict";
var JKY = JKY || {};
/**
 * JKY.Application - process all application functions
 *
 * require:	JKY.Utils.js
 *			JKY.Application.js
 */
JKY.Application = function() {
	var my_row;
	var my_id;
	var my_program_name;
	var my_table_name;

	function my_is_invalid(the_row, the_id) {
		var my_error = '';
		my_row	= the_row;
		my_id	= the_id ;
		my_program_name	= JKY.Application.get('program_name');
		my_table_name	= JKY.Application.get(  'table_name');

		my_error += my_validate_name	('jky-product-name'	, 'Product Name', 'Products', 'product_name');
		my_error += my_validate_name	('jky-user-name'	, 'User Name'	, 'Contacts', 'user_name'	);
		my_error += my_validate_name	('jky-nick-name'	, 'Nick Name'	, 'Contacts', 'nick_name'	);
		my_error += my_validate_name	('jky-full-name'	, 'Full Name'	, 'Contacts', 'full_name'	);

		my_error += my_validate_contact_company	(the_row, the_id);
/*
		my_error += my_validate_required		('jky-contact-company'	, 'Company'		);
		my_error += my_validate_numeric			('jky-cnpj'				, 'CNPJ or CPF'	);
		my_error += my_validate_numeric			('jky-ie'				, 'IE or RG'	);
*/

		if (JKY.is_empty(my_error)) {
			return false;
		}else{
			JKY.display_message(my_error);
			return true;
		}
	}

	function my_validate_numeric(the_dom_id, the_label) {
		if (JKY.is_loaded(the_dom_id) && (my_id == null || my_id == the_dom_id)) {
			var my_value = JKY.get_value(the_dom_id);
			if (JKY.is_empty(my_value) || JKY.is_numeric(my_value)) {
				return '';
			}else{
				return JKY.set_must_be_numeric(the_label);
			}
		}
		return '';
	}

	function my_validate_required(the_dom_id, the_label) {
		if (JKY.is_loaded(jky_dom_id) && (my_id == null || my_id == the_dom_id)) {
			if (!JKY.is_checked('jky-is-company')) {
				var my_company_id = JKY.get_value('jky-contact-company');
				if (JKY.is_empty(my_company_id)) {
					return JKY.set_is_required('Company');
				}
			}
		}
		return '';
	}

	function my_validate_contact_tag(the_row, the_id) {
		if (JKY.is_loaded('jky-contact-tag') && (the_id == null || the_id == 'jky-contact-tag')) {
			var my_contact_tag = JKY.get_value('jky-contact-tag');
			if (JKY.is_empty(my_contact_tag)) {
				return JKY.set_is_required('Tag');
			}
		}
		return '';
	}

	function my_validate_name(the_dom_id, the_label, the_table_name, the_key_name) {
		if (JKY.is_loaded(the_dom_id) && (my_id == null || my_id == the_dom_id)) {
			var my_value = JKY.get_value(the_dom_id);
			if (JKY.is_empty(my_value)) {
				if (my_program_name == 'Contacts') {
					return '';
				}else{
					return JKY.set_is_required(the_label);
				}
			}else{
				var my_found_id = JKY.get_product_id(my_name);
				var my_found_id = JKY.get_id(the_table_name, the_key_name + ' = \'' + my_value + '\'');
				if (JKY.is_empty(my_id) || (my_row != null && my_found_id == my_row.id)) {
					return '';
				}else{
					return JKY.set_already_taken(the_label);
				}
			}
		}
		return '';
	}

	function my_validate_user_name(the_row, the_id) {
		if (JKY.is_loaded('jky-user-name') && (the_id == null || the_id == 'jky-user-name')) {
			var my_user_name = JKY.get_value('jky-user-name');
			if (JKY.is_empty(my_user_name)) {
				var my_program_name = JKY.App.get('program_name');
				if (my_program_name != 'Contacts') {
					return JKY.set_is_required('User Name');
				}
			}else{
				var my_id = JKY.get_user_id(my_user_name);
				if (!JKY.is_empty(my_id) && ( the_row == null || my_id != the_row.id)) {
					return JKY.set_already_taken('User Name');
				}
			}
		}
		return '';
	}

	function my_validate_nick_name(the_row, the_id) {
		if (JKY.is_loaded('jky-nick-name') && (the_id == null || the_id == 'jky-nick-name')) {
			var my_nick_name = JKY.get_value('jky-nick-name');
			if (JKY.is_empty(my_nick_name)) {
				return JKY.set_is_required('Nick Name');
			}
			var my_id = JKY.get_id('Contacts', 'nick_name = \'' + my_nick_name + '\'');
			if (!JKY.is_empty(my_id) && ( the_row == null || my_id != the_row.id)) {
				return JKY.set_already_taken('Nick Name');
			}
		}
		return '';
	}

	function my_validate_full_name(the_row, the_id) {
		if (JKY.is_loaded('jky-full-name') && (the_id == null || the_id == 'jky-full-name')) {
			var my_full_name = JKY.get_value('jky-full-name');
			if (JKY.is_empty(my_full_name)) {
				return JKY.set_is_required('Full Name');
			}
			var my_id = JKY.get_id('Contacts', 'full_name = \'' + my_full_name + '\'');
			if (!JKY.is_empty(my_id) && ( the_row == null || my_id != the_row.id)) {
				return JKY.set_already_taken('Full Name');
			}
		}
		return '';
	}



	return {version		:	'1.0.0'
		, is_invalid	:	function(the_row, the_id)		{return my_is_invalid(the_row, the_id);}
	};
}();
