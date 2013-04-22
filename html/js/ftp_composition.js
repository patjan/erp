/*
 * display Composition ---------------------------------------------------------
 */

JKY.display_composition = function() {
	var my_html  = '';
	var my_total =  0;
	var my_rows  = JKY.row.composition;
	if (my_rows != '') {
		var my_comps = my_rows.split(', ');
		for(var i in my_comps) {
			var my_comp = my_comps[i];
			var my_strings  = my_comp.split(' ');
			var my_percent  = parseFloat(my_strings[0]);
			var my_material = my_strings[1];
			my_total += my_percent;
			my_html  += ''
				+ '<tr>'
				+ '<td class="jky-action"><a onclick="JKY.delete_composition(this)"><i class="icon-trash"></i></a></td>'
				+ '<td class="jky-comp-value"><input  class="jky-comp-percent"  text="text"	onchange="JKY.update_composition()" value="' + my_percent + '" /></td>'
				+ '<td class="jky-comp-label"><select class="jky-comp-material"				onchange="JKY.update_composition()">' + JKY.set_options_array(my_material, JKY.materials, false) + '</select></td>'
				+ '</tr>'
				;
		}
	}
	JKY.set_html('jky-comp-total', my_total);
	JKY.set_html('jky-comp-body' , my_html );
	if (my_rows == '') {
		JKY.insert_composition();
	}
}

JKY.update_composition = function() {
	var my_total = 0;
	var my_composition = '';
	$('#jky-comp-body tr').each(function() {
		var my_percent  = parseFloat($(this).find('.jky-comp-percent' ).val());
		var my_material = $(this).find('.jky-comp-material').val();
		var my_name = JKY.get_name_by_id(my_material, JKY.materials);
		my_composition += my_percent + ' ' + my_name + ', ';
		my_total += my_percent
	})
	JKY.set_html('jky-comp-total', my_total);
	if (my_total == 100) {
		$('#jky-comp-total').css('color', 'black');
		my_composition = my_composition.substr(0, my_composition.length-2);
		JKY.set_value('jky-composition', my_composition);
		var my_data =
			{ method	: 'update'
			, table		: 'FTPs'
			, set		: 'composition = \'' + my_composition + '\''
			, where		: 'id = ' + JKY.row.id
			};
		JKY.ajax(true, my_data, JKY.update_composition_success);
	}else{
		$('#jky-comp-total').css('color', 'red');
		JKY.display_message('Total percent is not 100.')
	}
}

JKY.update_composition_success = function(response) {
	JKY.display_message(response.message)
}

JKY.insert_composition = function() {
	var my_percent  = 0;
	var my_material = '';
	var	my_html = ''
		+ '<tr>'
		+ '<td class="jky-action"><a onclick="JKY.delete_composition(this)"><i class="icon-trash"></i></a></td>'
		+ '<td class="jky-comp-value"><input  class="jky-comp-percent"  text="text"	onchange="JKY.update_composition()" value="' + my_percent + '" /></td>'
		+ '<td class="jky-comp-label"><select class="jky-comp-material"				onchange="JKY.update_composition()">' + JKY.set_options_array(my_material, JKY.materials, false) + '</select></td>'
		+ '</tr>'
		;
	JKY.append_html('jky-comp-body', my_html);
}

JKY.delete_composition = function(id_name) {
	$(id_name).parent().parent().remove();
	JKY.update_composition();
}