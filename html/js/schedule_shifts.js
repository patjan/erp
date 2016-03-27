"use strict";
var JKY = JKY || {};
/*
 * display shifts -------------------------------------------------------------
 */
JKY.display_shifts = function(the_schedule_id) {
	var $my_tr = $('#jky-shifts-body tr'); 
	$my_tr.each(function() {
		var $my_this = $(this);
		var $my_shift = null;
		$my_shift = $my_this.find('.jky-td-shift-1T');
		$my_shift.find('.icon-trash').css('visibility', 'hidden');
		$my_shift.find('.jky-shift-id').val('');
		$my_shift.find('.jky-weaver-name').val('');
		$my_shift = $my_this.find('.jky-td-shift-2T');
		$my_shift.find('.icon-trash').css('visibility', 'hidden');
		$my_shift.find('.jky-shift-id').val('');
		$my_shift.find('.jky-weaver-name').val('');
		$my_shift = $my_this.find('.jky-td-shift-3T');
		$my_shift.find('.icon-trash').css('visibility', 'hidden');
		$my_shift.find('.jky-shift-id').val('');
		$my_shift.find('.jky-weaver-name').val('');
	});
		
	var my_data =
		{ method		: 'get_index'
		, table			: 'Shifts'
		, specific		: 'schedule'
		, specific_id	:  the_schedule_id
		};
	JKY.ajax(false, my_data, function(the_response) {
		the_response.rows.forEach(function(the_row) {
			var my_tr = $('#jky-shifts-body').find('tr[data-machine-id="' + the_row.machine_id + '"]');
			if (my_tr) {
				var my_td = $(my_tr).find('.jky-td-shift-' + the_row.shift_code);
				$(my_td).find('.icon-trash').css('visibility', 'visible');
				$(my_td).find('.jky-shift-id').val(the_row.id);
				$(my_td).find('.jky-weaver-name').val(the_row.weaver_name);
			}
		});
	});

	JKY.show('jky-shifts-body');
};

/*
 * copy shifts -------------------------------------------------------------
 */
JKY.copy_shifts = function(the_schedule_id_from, the_schedule_id_to) {
	var my_data =
		{ method		: 'get_index'
		, table			: 'Shifts'
		, specific		: 'schedule'
		, specific_id	:  the_schedule_id_from
		};
	JKY.ajax(false, my_data, function(the_response) {
		the_response.rows.forEach(function(the_row) {
			var my_set = ''
				+   'schedule_id=' +				the_schedule_id_to
				+  ', shift_code=' + JKY.set_quote (the_row.shift_code)
				+  ', machine_id=' +				the_row.machine_id
				+   ', weaver_id=' +				the_row.weaver_id
				+     ', remarks=' + JKY.set_quote (the_row.remarks)
				;
			var my_data =
				{ method	: 'insert'
				, table		: 'Shifts'
				, set		:  my_set
				};
			JKY.ajax(false, my_data);
		});
	});
};

/*
 * print shifts -------------------------------------------------------------
 */
JKY.print_shifts = function(the_id) {
	JKY.show('jky-loading');
	JKY.display_message('print_row: ' + the_id);

//window.print();
	var my_html = ''
		+ "<table class='jky-print-box'>"
		+ "<tr>"
//		+ "<td style='width:250px; font-weight:bold;'>" + JKY.Session.get_value('company_name') + "</td>"
		+ "<td style='width:250px; font-weight:bold;'>" + "<span>Schedules</span>" + "</td>"
		+ "<td style='width:330px; font-weight:bold;'>" + "</td>"
		+ "<td style='width:120px; text-align:right;'><span>Date</span>: " + JKY.out_date(JKY.row.schedule_date) + "</td>"
		+ "</tr>"
		+ "</table>"

		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<thead><tr class='jky-print-lines'>"
		+	'<th class="jky-print-machine"	><span>Machine</span></td>'
		+	'<th class="jky-print-shift"	><span>Shift 1</span></td>'
		+	'<th class="jky-print-shift"	><span>Shift 2</span></td>'
		+	'<th class="jky-print-shift"	><span>Shift 3</span></td>'
		+ "<tr><thead>"
		+ "<tbody id='jky-print-lines-body'></table>"
		+ "</table>"
		+ "<br>"

		+ "<div style='width:700px; border:1px solid black;'>"
//		+ "<div class='jky-print-label'><span>Remarks</span>:</div>"
		+ "<div id='jky-print-remarks'></div>"
		+ "</div>"
		;
	JKY.set_html('jky-printable', my_html);

	var $my_trs = $('#jky-shifts-body tr');
	var my_html = '';
	$my_trs.each(function() {
		var $my_tr = $(this);
		my_html += ''
			+ '<tr>'
			+ '<td class="jky-print-machine">' + $my_tr.find('.jky-td-machine').html() + '</td>'
			+ '<td class="jky-print-shift"	>' + $my_tr.find('.jky-td-shift-1T .jky-weaver-name').val() + '</td>'
			+ '<td class="jky-print-shift"	>' + $my_tr.find('.jky-td-shift-2T .jky-weaver-name').val() + '</td>'
			+ '<td class="jky-print-shift"	>' + $my_tr.find('.jky-td-shift-3T .jky-weaver-name').val() + '</td>'
			+ '</tr>'
			;
	});
	$('#jky-print-lines-body').html(my_html);
	JKY.t_tag('jky-printable', 'span');

//	JKY.show('jky-printable');
	$("#jky-printable").print();
	JKY.hide('jky-loading');
};
