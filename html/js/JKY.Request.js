"use strict";

/**
 * JKY.Request - process all changes during one transaction
 */
JKY.Request = function() {
	var my_requested = 0;
	var my_checkout	 = 0;

	function my_add_requested(the_weight) {
		if (the_weight != null) {
			my_requested += parseFloat(the_weight);
			my_requested  = Math.round(my_requested);
		}
	}

	function my_add_checkout(the_weight) {
		if (the_weight != null) {
			my_checkout += parseFloat(the_weight);
			my_checkout  = Math.round(my_checkout * 100) / 100
		}
	}

	function my_update_requested_weight(the_id) {
		var my_data =
			{ method	: 'update'
			, table		: 'Requests'
			, where		: 'id =' + the_id
			, set		: 'requested_weight=' + my_requested
			};
		JKY.ajax(true, my_data);
	}

	function my_update_checkout_weight(the_id) {
		var my_data =
			{ method	: 'update'
			, table		: 'Requests'
			, where		: 'id =' + the_id
			, set		: 'checkout_weight=' + my_checkout
			};
		JKY.ajax(true, my_data);
	}

	$(function() {
	});

	return {
		  set_requested	: function(the_amount)	{my_requested = the_amount;}
		, set_checkout	: function(the_amount)	{my_checkout  = the_amount;}

		, add_requested	: function(the_weight)	{my_add_requested(the_weight);}
		, add_checkout	: function(the_weight)	{my_add_checkout (the_weight);}

		, get_requested	: function()			{return my_requested;}
		, get_checkout	: function()			{return my_checkout ;}

		, update_requested_weight: function(the_id)		{my_update_requested_weight(the_id);}
		, update_checkout_weight : function(the_id)		{my_update_checkout_weight (the_id);}
	};
}();