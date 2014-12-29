/*
 * display Recipes -------------------------------------------------------------
 */

JKY.display_recipes = function() {
	var my_data =
		{ method		: 'get_index'
		, table			: 'Recipes'
		, specific		: 'color'
		, specific_id	:  JKY.row.id
		, order_by		: 'Recipes.composition'
		};
	JKY.ajax(false, my_data, JKY.generate_recipes);
}

JKY.generate_recipes = function(response) {
	var my_html  = '';
	var my_rows  = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row			= my_rows[i];
			my_html += JKY.generate_recipe(my_row);
		}
	}
	JKY.set_html('jky-recipes-body' , my_html );
	if (my_rows == '') {
//		JKY.insert_recipe();
	}
}

JKY.generate_recipe = function(the_row) {
	var my_id		= the_row.id;
	var my_name		= the_row.composition;
	var my_recipe	= the_row.recipe;
	var my_trash = (my_id) ? '<a onclick="JKY.delete_recipe(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '&nbsp;';
	var my_composition = ''
		+ "<input class='jky-composition-name' readonly onchange='JKY.update_name(this, " + my_id + ")' value='" + my_name + "' />"
		+ " <a href='#' onClick='JKY.Composition.display(this)'><i class='icon-share'></i></a>"
		;

	var my_html = ''
		+ '<tr recipe_id=' + my_id + '>'
		+ '<td class="jky-td-action"	>' + my_trash + '</td>'
		+ '<td class="jky-td-name-w"	>' + my_composition + '</td>'
		+ '<td class="jky-td-recipe"	><input changeable class="jky-recipe" value="' + JKY.fix_null(my_recipe) + '" onchange="JKY.change_recipe(this, ' + my_id + ')" /></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.change_recipe = function(the_this, the_id ) {
	var my_recipe = $(the_this).val();

	var my_data =
		{ method	: 'update'
		, table		: 'Recipes'
		, set		: 'recipe = \'' + my_recipe + '\''
		, where		: 'Recipes.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.change_recipe_success);
}

JKY.change_recipe_success = function(the_response) {
}

JKY.update_name = function(id_name, the_id ) {
//	var my_tr = $(id_name).parent().parent();
//	var my_name	= my_tr.find('.jky-recipe-name').val();
	var my_name	= $(id_name).val();
	var my_data =
		{ method	: 'update'
		, table		: 'Recipes'
		, set		: 'composition = \'' + my_name	 + '\''
		, where		: 'Recipes.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_name_success);

}

JKY.update_name_success = function(response) {
	JKY.display_message(response.message)
}

JKY.insert_recipe = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'Recipes'
		, set		: 'Recipes.color_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_recipe_success);
}

JKY.insert_recipe_success = function(response) {
	var my_row = [];
	my_row.id = response.id;
	my_row.name		= '';
	my_row.recipe	= '';

	var	my_html = JKY.generate_recipe(my_row);
	JKY.append_html('jky-recipes-body', my_html);
}

JKY.delete_recipe = function(id_name, the_id) {
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'Recipes'
		, where		: 'Recipes.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_recipe_success);
}

JKY.delete_recipe_success = function(response) {
	JKY.display_message(response.message)
}