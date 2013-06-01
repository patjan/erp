"use strict";

/**
 * JKY.Changes - process all changes during one transaction
 *				 control save into private array [my_appraisals]
 *
 * method:	reset()
 * 			incremet()
 *			decrement()
 *			has_changes(the_stay_on_page)
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 */
JKY.Changes = function() {
	var my_changes = 0;		//	number of changes applied on current transaction

	/**
	 *
	 */
	function my_set_button_save() {
		if (my_changes == 0) {
			JKY.disable_button('jky-action-save'	);
//			JKY.disable_button('jky-action-cancel'	);
		}else{
			JKY.enable_button('jky-action-save'		);
//			JKY.enable_button('jky-action-cancel'	);
		}
	}

	/**
	 * if has changes
	 *    then display confirmation layer
	 * 		   if reply = no
	 *			  then re-direct to the_stay_on_page
	 */
	function my_can_leave(the_function) {
		if (my_changes == 0) {
			the_function();
		}else {
			JKY.click_confirm = function(reply) {
				$('#jky-confirm').modal('hide');
				if (reply == 'Yes' && typeof(the_function) == 'function') {
					my_changes = 0;
					the_function();
				}
			}

			var my_header = 'Leaving';
			var my_body   = ''
				+ 'This page has <b>' + my_changes + ' unsaved</b> change(s).'
				+ ' <br>Do you want to leave to new page'
				+ ' <br> <b>without</b> saving them?'
				;
			var my_label_yes = 'Leave Page';
			var my_label_no  = 'Stay on Page';
			JKY.set_html	('jky-confirm-header'	, my_header		);
			JKY.set_html	('jky-confirm-body'		, my_body		);
			JKY.set_html	('jky-confirm-yes'		, my_label_yes	);
			JKY.set_html	('jky-confirm-no'		, my_label_no	);
			JKY.show_modal	('jky-confirm');
		}
	}

//	$(function() {
//		my_changes = 0;
//	});

	return {
		  reset			: function()	{my_changes  = 0; my_set_button_save();}
		, increment		: function()	{my_changes += 1; my_set_button_save();}
		, decrement		: function()	{my_changes -= 1; my_set_button_save();}

		, can_leave		: function(the_function)	{return my_can_leave(the_function);}
	};
}();