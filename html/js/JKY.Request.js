"use strict";

/**
 * JKY.Request - process all changes during one transaction
 *				 control save into private array [my_appraisals]
 *
 * method:	display(the_id)
 * 			load_data()
 *			click_row(the_index, the_id)
 *			add_new()
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-Request-row-id'  ).val(the_id );
 *		$(my_parent).find('.jky-Request-row-name').val(my_name);
 */
JKY.Request = function() {
	var my_requested	= 0;
	var my_checkout	= 0;
	function my_add_requested(the_weight) {
		if (the_weight != null) {
			my_requested += parseFloat(the_weight);
		}
	}

	function my_add_checkout(the_weight) {
		if (the_weight != null) {
			my_checkout += parseFloat(the_weight);
		}
	}

	$(function() {
	});

	return {
		  set_requested	: function(the_amount)	{my_requested = the_amount;}
		, set_checkout	: function(the_amount)	{my_checkout = the_amount;}

		, add_requested	: function(the_weight)	{my_add_requested(the_weight);}
		, add_checkout	: function(the_weight)	{my_add_checkout(the_weight);}

		, get_requested	: function()			{return my_requested;}
		, get_checkout	: function()			{return my_checkout;}
	};
}();