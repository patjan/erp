"use strict";

/**
 * JKY.Purchase - process all changes during one transaction
 *				 control save into private array [my_appraisals]
 *
 * method:	display(the_id)
 * 			load_data()
 *			click_row(the_index, the_id)
 *			add_new()
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-Purchase-row-id'  ).val(the_id );
 *		$(my_parent).find('.jky-Purchase-row-name').val(my_name);
 */
JKY.Purchase = function() {
	var my_expected	= 0;
	var my_received	= 0;
	function my_add_expected(the_weight) {
		if (the_weight != null) {
			my_expected += parseFloat(the_weight);
		}
	}

	function my_add_received(the_weight) {
		if (the_weight != null) {
			my_received += parseFloat(the_weight);
		}
	}

	$(function() {
	});

	return {
		  set_expected	: function(the_amount)	{my_expected = the_amount;}
		, set_received	: function(the_amount)	{my_received = the_amount;}

		, add_expected	: function(the_weight)	{my_add_expected(the_weight);}
		, add_received	: function(the_weight)	{my_add_received(the_weight);}

		, get_expected	: function()			{return my_expected;}
		, get_received	: function()			{return my_received;}
	};
}();