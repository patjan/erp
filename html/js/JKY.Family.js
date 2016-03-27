"use strict";
var JKY = JKY || {};
/**
 * JKY.Family - process all changes during one transaction
 *				 control save into private array [my_appraisals]
 *
 * method:	display(the_id)
 * 			load_data()
 *			click_row(the_index, the_id)
 *			add_new()
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-family-id'  ).val(the_id );
 *		$(my_parent).find('.jky-family-name').val(my_name);
 */
JKY.Family = function() {
	var my_the_id		= null;		//	external id that initiated the call
	var my_the_type		= null;		//	selected family type: Punho, Gola, Galao
	var my_order_by		= 'family_name';
	var my_filter		= 'jky-family-filter';
	var my_search_body	= 'jky-family-search-body';
	var my_layer		= 'jky-family-search';
	var my_cookie		= null;

	function my_display_info(the_this) {
		var my_id = $(the_this).parent().find('.jky-family-id').val();
		if (my_id == 'null')	return;

		var my_data =
			{ method	: 'get_row'
			, table		: 'Families'
			, where		: 'Families.id = ' + my_id
			};
		JKY.ajax(true, my_data, my_display_info_success);
	}

	function my_display_info_success(the_response) {
		var my_row = the_response.row;
		var my_html = ''
			+ '<div><label>' + JKY.t('Family'		) + ': </label><span>' + my_row.family_name	+ '</span></div>'
			+ '<div><label>' + JKY.t('Type'			) + ': </label><span>' + my_row.family_type+ '</span></div>'
			+ '<div><label>' + JKY.t('Finishings'	) + ': </label><span>' + my_row.finishings	+ '</span></div>'
			+ '<div><label>' + JKY.t('Washings'		) + ': </label><span>' + my_row.washings	+ '</span></div>'
			+ '<div><label>' + JKY.t('Peso'			) + ': </label><span>' + my_row.peso		+ '</span></div>'
			+ '<div><label>' + JKY.t('Units'		) + ': </label><span>' + my_row.units		+ '</span></div>'
			+ '<div><label>' + JKY.t('Weight'		) + ': </label><span>' + my_row.weight_customer + ' : ' + my_row.weight_dyer + '</span></div>'
			+ '<div><label>' + JKY.t('Width'		) + ': </label><span>' + my_row.width_customer  + ' : ' + my_row.width_dyer  + '</span></div>'
			+ '<div><label>' + JKY.t('Yield'		) + ': </label><span>' + my_row.yield		+ '</span></div>'
			;
		JKY.set_html('jky-family-name', my_row.family_name);
		JKY.set_html('jky-family-body', my_html);
		JKY.show_modal('jky-family-info');
	}

	function my_display(the_id, the_type) {
		my_the_id = the_id;
		if (the_type == null) {
			my_the_type	= 'All';
		}else{
			my_the_type	= the_type;
		}
		JKY.set_focus(my_filter);
		my_load_data();
	}

	function my_load_data() {
		var my_data =
			{ method	: 'get_index'
			, table		: 'Families'
			, select	:  my_the_type
			, filter	:  JKY.get_value(my_filter)
			, display	: '10'
			, order_by	:  my_order_by
			};
		JKY.ajax(false, my_data, function(the_response) {
			var my_rows	= the_response.rows;
			var my_html = '';
			for(var i=0; i<my_rows.length; i++) {
				var my_row = my_rows[i];
				my_html += '<tr onclick="JKY.Family.click_row(this, ' + my_row.id + ')">'
						+  '<td class="jky-search-family-name"	>' + my_row.family_name + '</td>'
						+  '<td class="jky-search-counter"		>' + my_row.products	+ '</td>'
						+  '</tr>'
						;
			}
			JKY.set_html(my_search_body, my_html);
			JKY.show_modal(my_layer);
		})
	}

	function my_click_row(the_index, the_id) {
		var my_name		= $(the_index).find('.jky-search-family-name' ).html();
		var my_parent	= $(my_the_id).parent().parent();

//		this reverse sequence is needed to avoid out sequence on DB update
//		keep only the last change event

		var	my_dom_id = $('#jky-family-id');							//	Families
		if (my_dom_id.length == 0) {
			my_dom_id = $(my_parent).find('#jky-family-id');			//	Quotations
//			my_dom_id = $('#jky-family-id');
			if (my_dom_id.length == 0) {
				my_dom_id = $(my_parent).find('.jky-family-id');
			}
		}
		my_dom_id.val(the_id );

		var	my_dom_name = $('#jky-family-base');						//	Families
		if (my_dom_name.length == 0) {
			my_dom_name = $(my_parent).find('#jky-family-name');		//	Quotations
//			my_dom_name = $('#jky-family-name');
			if (my_dom_name.length == 0) {
				my_dom_name = $(my_parent).find('.jky-family-name');
			}
		}
		my_dom_name.val(my_name);

		my_dom_name.change();		//	to activate change event
		JKY.hide_modal(my_layer);
	}

	function my_add_new() {
		var my_family_name = JKY.get_value(my_filter).trim();
		if (my_family_name === '')		{return;}
		
		var my_data =
			{ method	: 'insert'
			, table		: 'Families'
			, set		: 'Families.family_name = \'' + my_family_name + '\''
			};
		JKY.ajax(false, my_data, function(the_response) {
			$('#jky-family-id'  ).val(the_response.id);
			$('#jky-family-name').val(my_family_name);
			JKY.hide_modal(my_layer);
		})
	}

	$(function() {
		my_cookie = $.cookie(my_layer);
	});

	return {
		  display_info	: function(the_this)			{		my_display_info(the_this);}
		, display		: function(the_id, the_type)	{		my_display(the_id, the_type);}
		, load_data		: function()					{		my_load_data();}
		, click_row		: function(the_index, the_id)	{		my_click_row(the_index, the_id);}
		, add_new		: function()					{		my_add_new();}
	};
}();