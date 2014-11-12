"use strict";
/**
 * JKY.Washings -
 */
JKY.Washings = function() {

	var my_display = function(the_selected) {
		var my_selected = (the_selected) ? the_selected.split(', ') : [];
		$('#jky-washings-tbody tr').each(function() {
			var my_id	= $(this).attr('id').substr(21);
			var my_value= $(this).find('.jky-td-filter').html();
			if (JKY.in_array(my_value, my_selected)) {
				$(this).removeClass	('jky-hide');
				$(this).addClass	('jky-show');
				$('#jky-washing-available-' + my_id).removeClass	('jky-show');
				$('#jky-washing-available-' + my_id).addClass	('jky-hide');
			}else{
				$(this).removeClass	('jky-show');
				$(this).addClass	('jky-hide');
				$('#jky-washing-available-' + my_id).removeClass	('jky-hide');
				$('#jky-washing-available-' + my_id).addClass	('jky-show');
			}
		});
		$('#jky-washing-filter').keyup();
		JKY.set_focus('jky-washing-filter');
	}

	var my_process_filter = function(the_this) {
		var my_filter = $.trim($(the_this).val());
		if (my_filter == '') {
			$('#jky-washings-tbody tr').each(function() {
				var my_id	= $(this).attr('id').substr(21);
				var my_show	= $(this).hasClass('jky-show');
				if (my_show) {
					$(this).show();
					$('#jky-washing-available-' + my_id).hide();
				}else{
					$(this).hide();
					$('#jky-washing-available-' + my_id).show();
				}
			});
		}else{
			var my_pattern = new RegExp(my_filter, 'gi');
			$('#jky-washings-tbody tr').each(function() {
				var my_id	= $(this).attr('id').substr(21);
				var my_show	= $(this).hasClass('jky-show');
				var my_value= $(this).find('.jky-td-filter').html();
				if (my_value.match(my_pattern)) {
					if (my_show) {
						$(this).show();
						$('#jky-washing-available-' + my_id).hide();
					}else{
						$(this).hide();
						$('#jky-washing-available-' + my_id).show();
					}
				}else{
					if (my_show) {
						$(this).hide();
						$('#jky-washing-available-' + my_id).hide();
					}else{
						$(this).hide();
						$('#jky-washing-available-' + my_id).hide();
					}
				}
			});
		}
	}

	var my_select_line = function(the_this, the_id) {
		var my_line = $(the_this);
		var my_parent_id = my_line.parent().attr('id');
		if (my_parent_id == 'jky-washings-tbody') {
			$(the_this).removeClass	('jky-show');
			$(the_this).addClass	('jky-hide');
			$('#jky-washing-available-' + the_id).removeClass('jky-hide');
			$('#jky-washing-available-' + the_id).addClass	('jky-show');
		}else{
			$(the_this).removeClass	('jky-show');
			$(the_this).addClass	('jky-hide');
			$('#jky-washing-selected-'  + the_id).removeClass('jky-hide');
			$('#jky-washing-selected-'  + the_id).addClass	('jky-show');
		}
		var my_selected = [];
		$('#jky-washings-tbody tr').each(function() {
			if ($(this).hasClass('jky-show')) {
				var my_value = $(this).find('.jky-td-filter').html();
				my_selected.push(my_value);
			}
		});
		var my_data =
			{ method	: 'update'
			, table		: 'Products'
			, set		: 'washings = \'' + my_selected.join(', ') + '\''
			, where		: 'Products.id = ' + JKY.row.id
			};
		JKY.ajax(true, my_data);
		JKY.row['washings'] = my_selected.join(', ');

		JKY.set_value('jky-washing-filter', '');
		$('#jky-washing-filter').keyup();
		JKY.set_focus('jky-washing-filter');
	}

	var my_set_checked = function(the_this) {
		$(the_this).prop('checked', true);
	}

	var my_remove_checked = function(the_this) {
		$(the_this).prop('checked', false);
	}

	$(function() {
		var my_header = ''
			+ '<tr>'
			+ '<th class="jky-td-checkbox"	></th>'
			+ '<th class="jky-td-filter" colspan="2"><input id="jky-washing-filter" class="jky-washing-filter" type="text" placeholder="Filter" onkeyup="JKY.Washings.process_filter(this)" /></th>'
			+ '</tr>'
			;
		JKY.set_html('jky-washings-thead', my_header);

		var my_selected  = '';
		var my_available = '';
		var my_configs = JKY.get_configs('Washing Instructions');
		for(var i=0, max=my_configs.length; i<max; i++) {
			var my_config	= my_configs[i];
			var my_id		= my_config.id;
			var my_name		= my_config.name;
			var my_value	= JKY.is_empty(my_config.value) ? my_name : my_config.value;
			my_selected += ''
				+ '<tr class="jky-config-line jky-hide" onclick="JKY.Washings.select_line(this, ' + my_id + ')" id="jky-washing-selected-'  + my_id + '">'
				+ '<td class="jky-td-checkbox"	><input type="checkbox" onclick="JKY.Washings.set_checked(this)" checked="checked" /></td>'
				+ '<td class="jky-td-filter"	>' + my_name  + '</td>'
				+ '<td class="jky-td-value"		>' + my_value + '</td>'
				+ '</tr>'
				;
			my_available += ''
				+ '<tr class="jky-config-line jky-show" onclick="JKY.Washings.select_line(this, ' + my_id + ')" id="jky-washing-available-' + my_id + '">'
				+ '<td class="jky-td-checkbox"	><input type="checkbox" onclick="JKY.Washings.remove_checked(this)" /></td>'
				+ '<td class="jky-td-filter"	>' + my_name  + '</td>'
				+ '<td class="jky-td-value"		>' + my_value + '</td>'
				+ '</tr>'
				;
		}
		JKY.set_html('jky-washings-tbody', my_selected );
		JKY.set_html('jky-washings-tfoot', my_available);
	});

	return {
		  display		: function(the_selected)		{my_display			(the_selected		);}
		, process_filter: function(the_this)			{my_process_filter	(the_this			);}
		, select_line	: function(the_index, the_id)	{my_select_line		(the_index, the_id	);}
		, set_checked	: function(the_this)			{my_set_checked		(the_this			);}
		, remove_checked: function(the_this)			{my_remove_checked	(the_this			);}
	};
}();