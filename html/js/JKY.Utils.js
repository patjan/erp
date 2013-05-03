"use strict";

/**
 * JKY.Util.js
 * generic functions for the JKY application
 */

/**
 * define JKY namespace for all application
 */
var JKY = JKY || {};

/**
 * define all constants
 */
JKY.AJAX_APP	= '../';					//  relative to application directory
//JKY.AJAX_URL	= '../jky_proxy.php?';		//  relative to remote directory
JKY.AJAX_URL	= '../index.php/ajax?';		//  relative to remote directory

JKY.sort_name	= '';
JKY.sort_seq	=  1;

/**
 * run after jquery loaded
 * setup ajax
 */
$(function() {
	$.ajaxSetup({
		async	: false,
		type	: 'post',
		dataType: 'json',
		error	: function(jqXHR, textStatus, errorThrown) {
			JKY.hide('jky-loading');
			JKY.display_message('Error from backend server, please re-try later.');
		}
	});
	if ($('#jky-utils').length == 0)	{
		$('body').append('<div id="jky-utils"></div>');
		JKY.load_html('jky-utils', 'JKY.utils.html'	);
	}

	if (JKY.is_browser('msie')) {
		JKY.TRACE = false;		//	IE, TRACE must be false
	}else{
		JKY.TRACE = false;		//	on production, should be set to false, help developement to trace sequence flow
	}

	$(window).bind('resize', function() {
		JKY.setTableWidthHeight('jky-app-table', 851, 221, 390, 115);
	});
});

/**
 * binding on resize
 * not to bind on IE < 9, it will cause infinite loops
 * wait until any order is loaded, to binding on scroll
 *
 * !!! important !!!
 * window resize can be bond only once per load
 */
JKY.binding_on_resize = function() {
	if (JKY.is_browser('msie') && $.browser.version < 9) {
		return;
	}
	if (JKY.orders.length > 0) {
		$(window).bind('resize', function() {
			CX.setTableWidthHeight('jky-app-table', 690, 390, 150);
		});
	} else {
		setTimeout(function() {CX.binding_on_resize();}, 100);
	}
}

/**
 * set table width and height
 * adjust height minus offset height, but not less than minimum height
 * @param	tableId
 * @param	width
 * @param	minHeight
 * @param	offHeight
 */
JKY.setTableWidthHeight = function(tableId, width, off_width, minHeight, offHeight) {
	/*
	 * jquery 1.7.x the function .height() was working for all 4 browsers (IE,FF,CH,SF)
	 * but on 1.8.x it was working only on IE
	 */
	var my_width  = $(window).width ();
	var my_height = $(window).height();
	if (!JKY.is_browser('msie')) {
		my_width  = document.body[ "clientWidth"  ];
		my_height = document.body[ "clientHeight" ];
	}
	my_width  -= off_width;
	my_height -= offHeight;

	if (my_height < minHeight) {
		my_height = minHeight;
	}
	$('#jky-app-table').css('width' , my_width );
	$('#jky-app-table').css('height', my_height);
	$('#jky-app-form' ).css('width' , my_width );
	$('#jky-app-form' ).css('height', my_height);
	$('#jky-app-table').css('width' , my_width );
	$('#jky-app-table').css('height', my_height);
	$('#jky-app-form' ).css('width' , my_width );
	$('#jky-app-form' ).css('height', my_height);
}

/**
 * re direct
 * @param	program_name
 */
JKY.re_direct = function(program_name) {
alert('re direct to ' + program_name);
	if (typeof program_name == 'undefined') {
		location = '/home';
	}else{
		location = '/' + program_name;
	}
}

/**
 * run when is template ready
 * wait until the template is ready
 * @param	template_name
 * @param	function_name
 */
JKY.run_when_is_ready = function(template_name, function_name) {
	JKY.display_trace('run_when_is_ready: ' + template_name);
	if (Em.TEMPLATES[template_name]) {
		function_name();
	}else{
		setTimeout( function() {JKY.run_when_is_ready(template_name, function_name);}, 100);
	}
}

/**
 * set translations
 *
 * @param	array
 * @example	JKY.set_translations('portugues')
 */
JKY.set_translations = function(the_array) {
    JKY.translations = the_array;
}

/**
 * translate
 *
 * @param	text
 * @return	translated text
 * @example JKY.t('Home')
 */
JKY.t = function(the_text) {
	if (typeof the_text == 'undefined' || the_text == '') {
		return '';
	}

	var my_result = JKY.translations[the_text];
	if (typeof my_result == 'undefined') {
//alert('the_text: ' + the_text);
		my_result = '';
		var my_names = the_text.split('<br>');
		for (var i=0; i<my_names.length; i++) {
			var my_name = my_names[i];
			var my_translation = JKY.translations[my_name];
			my_result += (i == 0) ? '' : '<br>';
			if (typeof my_translation == 'undefined') {
				my_result += my_name;
			}else{
				my_result += my_translation;
			}
		}
	}
    return my_result;
}

JKY.t_tag = function(the_tag) {
	$('#jky-application ' + the_tag).each(function() {
		var my_text = $(this).html().trim();
		$(this).html(JKY.t(my_text));
	});
}

JKY.t_input = function(the_attr) {
	$('#jky-application input').each(function() {
		var my_text = $(this).attr(the_attr);
		$(this).attr(the_attr, JKY.t(my_text));
	});
}

/**
 * load html into specific id
 * wait until the id is rendered
 * @param	id_name
 * @param	file_name
 */
JKY.load_html = function(id_name, file_name) {
//	JKY.display_trace('load_html: ' + id_name);
	if ($('#' + id_name).length > 0) {
		$('#' + id_name).load('../' + file_name);
//		JKY.display_trace('load_html: ' + id_name + ' DONE');
		JKY.t_tag	('span');
		JKY.t_input	('placeholder');
	}else{
		setTimeout(function() {JKY.load_html(id_name, file_name);}, 100);
	}
}

/**
 * process action
 * @param	action
 */
JKY.process_action = function(action) {
//	JKY.display_trace('process_action: ' + action);
//	JKY.load_html('jky-body-content', action + '.html');
	JKY.invisible('jky-application');
	JKY.load_html('jky-application', action + '.html');
//	$.getScript(JKY.AJAX_APP + 'js/' + action + '.js', function() {
		JKY.start_program(action);
		JKY.visible('jky-application');
//	});
}

/**
 * load handlebar into specific template
 * @param	template_name
 * @param	file_name
 */
JKY.load_hb = function(template_name, file_name) {
	JKY.display_trace('load_hb: ' + template_name);
	if ($('#jky-hb').length > 0) {
		$('#jky-hb').load('../hb/' + file_name, function(src) {
			Em.TEMPLATES[template_name] = Em.Handlebars.compile(src);
			$('#jky-hb').html('');
		});
		JKY.display_trace('load_hb: ' + template_name + ' DONE');
	}else{
		setTimeout(function() {JKY.load_hb(template_name, file_name);}, 100);
	}
}

/**
 * replace in template into specific id
 * wait until the template is loaded
 * @param	template_name
 * @param	id_name
 * @return	(new)View
 */
JKY.replace_in = function(template_name, id_name, view_object) {
	JKY.display_trace('replace_in: ' + template_name);
	if (Em.TEMPLATES[template_name] && $('#' + id_name)) {
		view_object.replaceIn('#' + id_name);
		JKY.display_trace('replace_in: ' + template_name + ' DONE');
	}else{
		setTimeout(function() {JKY.replace_in(template_name, id_name, view_object)}, 100);
	}
}

/**
 * fix flag
 * @param	flag_value
 * @param	true_value
 * @param	false_value
 * @return	&nbsp;
 * @return	true_value
 * @return	false_value
 */
JKY.fix_flag = function(flag_value, true_value, false_value){
	if (flag_value) {
		if (flag_value == 't') {
			return true_value;
		}else{
			return false_value;
		}
	}else{
		return '&nbsp;';
	}
}

/**
 * fix break line
 * replace ' ' with '<br />'
 * @param	string_value
 * @return	&nbsp;
 * @return	string_value
 */
JKY.fix_br = function(string_value){
	if (string_value) {
		if (typeof string_value == 'string') {
			return string_value.replace(' ', '<br />');
		}else{
			return string_value;
		}
	}else{
		return '&nbsp;';
	}
}

/**
 * get now date or time
 * @return yyyy-mm-dd
 */
JKY.get_now = function(the_format) {
	if (typeof the_format == 'undefined') {
		the_format = 'yyyy-mm-dd';
	}
	var my_date = new Date();
//	return my_date.format(the_format);
	return my_date;
}

/**
 * short date time
 * @param	date_time	yyyy-mm-dd hh:mm:ss
 * @return	yyyy-mm-dd
 * @return	mm-dd hh:ss
 */
JKY.short_date = function(the_date_time){
	var my_date = '';
	if (the_date_time != null) {
		my_date = the_date_time.substr(0, 10);
		if (my_date == JKY.get_now()) {
			my_date = the_date_time.substr(5, 11);
		}
	}
	return my_date;
}

/**
 * fix date time
 * replace ' @ ' with '<br />'
 * @param	date_time	mm/dd/yy @ hh:mm xm
 * @return	&nbsp;
 * @return	date_time	mm/dd/yy<br />hh:mm xm
 */
JKY.fix_date = function(date_time){
	if (date_time) {
		date_time = date_time.replace(' @ ', '<br />');
		date_time = date_time.replace(' @', '');
		return date_time;
	}else{
		return '&nbsp;';
	}
}

/**
 * fix name
 * return lastName, firstName
 * @param	trailer		'<br />'
 * @param	first_name
 * @param	last_name
 * @return	&nbsp;
 * @return	full_name
 */
JKY.fix_name = function(trailer, first_name, last_name){
	if (first_name && last_name) {
		return trailer + last_name + ', ' + first_name;
	}else{
		return '&nbsp;';
	}
}

/**
 * fix null value
 * replace 'undefined' with '&nbsp;'
 * @param	string_value
 * @return	&nbsp;
 * @return	string_value
 */
JKY.fix_null = function(string_value){
	if (string_value) {
		return string_value;
	}else{
		return '&nbsp;';
	}
}

/**
 * fix ymd to dmy
 * @param	yyyy-mm-dd
 * @return	dd-mm-yyyy
 */
JKY.fix_ymd2dmy = function(date){
	if (date == null) {
		return '';
	}
	var my_dates = date.split('-');
	return my_dates[2] + '-' + my_dates[1] + '-' + my_dates[0];
}

/**
 * fix dmy to ymd
 * @param	dd-mm-yyyy
 * @return	yyyy-mm-dd
 */
JKY.fix_dmy2ymd = function(date){
	var my_date = date.trim();
	if (my_date == '') {
		return 'null';
	}
	var my_dates = my_date.split('-');
	return '\'' + my_dates[2] + '-' + my_dates[1] + '-' + my_dates[0] + '\'';
}

/**
 * set table width and height
 * adjust height minus offset height, but not less than minimum height
 * @param	tableId
 * @param	width
 * @param	minHeight
 * @param	offHeight
 */
JKY.XsetTableWidthHeight = function(tableId, width, minHeight, offHeight) {
	/*
	 * jquery 1.7.x the function .height() was working for all 4 browsers (IE,FF,CH,SF)
	 * but on 1.8.x it was working only on IE
	 */
	var myHeight = $(window).height();
	if (!JKY.is_browser('msie')) {
		myHeight = document.body[ "clientHeight" ];
	}
	myHeight -= offHeight;

	if (myHeight < minHeight) {
		myHeight = minHeight;
	}
	JKY.display_trace('setTableWidthHeight, width: ' + width + ', height: ' + myHeight);
//	$('#' + tableId).tableScroll({width :width		});
//	$('#' + tableId).tableScroll({height:myHeight	});
setTimeout(function() {
//$('#' + tableId).tableScroll({width:width, height:270});
$('#' + tableId).tableScroll({width:width, height:myHeight});
$('#scroll-bar').css('width', '4px');
}, 100);
}

/**
 * display message on right bottom corner
 * it will stay be displayed long enought to be read
 * if provided id_name, will set focus after timeout
 * @param	message
 * @param	id_name
 *
 * dependency	#jky-message
 *				#jky-message-body
 *
 */
JKY.display_message = function(message, id_name) {
	if (message == '') {
		return;
	}
	if (message.substr(0, 4) == '<br>') {
		message = message.substr(4);
	}
	var the_body = $('#jky-message-body');
	if (the_body.html() == '') {
		the_body.append(message);
	}else{
		the_body.append('<br />' + message);
	}
	JKY.show('jky-message');

	var my_time = the_body.html().length / 10;
		 if (my_time <  2)		{my_time =  2;}
	else if (my_time > 20)		{my_time = 20;}

	if (JKY.last_time_out){
		clearTimeout(JKY.last_time_out);
	}
	JKY.last_time_out = setTimeout(function(){
		JKY.hide('jky-message');
		the_body.html('');
		if (typeof(id_name) != 'undefined') {
			JKY.set_focus(id_name);
		}
	}, my_time * 1000);
}

/**
 * display trace on left bottom corner
 * it will be displayed if JKY.TRACE = true
 * @param	message
 */
JKY.display_trace = function(message){
	if (!JKY.TRACE) {		//	this control is set on [setup definition of constants] of [index.js]
		return
	}
	var my_date = new Date();
	var my_msec = (my_date.getMilliseconds() + 1000).toString().substr(1);
	var my_time = my_date.getMinutes() + ':' + my_date.getSeconds() + '.' + my_msec;
	console.log(my_time + ' ' + message);

	var my_html = my_time + ' ' + message + '<br />' + $('#jky-trace-body').html();
	$('#jky-trace-body').html(my_html);
	JKY.show('jky-trace');

}

/**
 * append specific id with html content
 * @param	id_name
 * @param	html
 */
JKY.append_html = function(id_name, html){
	$('#' + id_name).append(html);
}

/**
 * set specific id with html content
 * @param	id_name
 * @param	html
 */
JKY.set_html = function(id_name, html){
	$('#' + id_name).html(html);
}

/**
 * set specific id with value
 * @param	id_name
 * @param	value
 */
JKY.set_value = function(id_name, value){
	$('#' + id_name).val(value);
}

/**
 * set yes on specific value
 * @param	id_name
 * @param	value
 */
JKY.set_yes = function(id_name, value){
	$('#' + id_name).removeAttr('checked');
	if (value == 'Yes') {
		var my_command = "$('#" + id_name + "').attr('checked', 'checked');";
		setTimeout(my_command, 100);
	}
}

/**
 * set check on specific value
 * @param	id_name
 * @param	value
 */
JKY.set_check = function(id_name, value){
	$('#' + id_name).removeAttr('checked');
	var my_command = "$('#" + id_name + " :checkbox[value=" + value + "]').attr('checked', 'checked');";
	setTimeout(my_command, 100);
}

/**
 * set radio on specific value
 * @param	id_name
 * @param	value
 */
JKY.set_radio = function(id_name, value){
	$('#' + id_name).removeAttr('checked');
	var my_command = "$('#" + id_name + " :radio[value=" + value + "]').attr('checked', 'checked');";
	setTimeout(my_command, 100);
}

/**
 * set selected specific id with value
 * @param	id_name
 * @param	value
 */
JKY.set_option = function(id_name, value){
     $('#' + id_name + ' option:selected').removeAttr('selected');
     if(  value ) {
          var my_command = "$('#" + id_name + " option[ value=\"" + value + "\" ]').attr('selected', 'selected');";
          setTimeout(my_command, 100);
     }
}

//        JKY.set_options(20, 'All', 10, 20, 50, 100, 200, 500, 1000)
//        ----------------------------------------------------------------------
JKY.set_options = function( ) {
     options   = '';
     set_value = arguments[0];

     for( var i=1; i<arguments.length; i++ ) {
          value = arguments[i];
          selected = (value == set_value) ? ' selected="selected"' : '';
          options += '<option value="' + value + '"' + selected + '>' + value + '</option>';
     }
     return options;
}

//	JKY.set_options_array(20, array, true)
//	----------------------------------------------------------------------------
JKY.set_options_array = function(the_selected, the_array, the_null) {
	var my_options = '';
	if (the_null) {
		my_options += '<option value=null></option>';
	}
	for(var i=0; i<the_array.length; i++) {
		var my_value = the_array[i].name;
		var my_id    = the_array[i].id;
		if (typeof my_id == 'undefined') {
			my_id = my_value;
		}
		var my_selected = (my_value == the_selected) ? ' selected="selected"' : '';
		my_options += '<option value="' + my_id + '"' + my_selected + '>' + my_value + '</option>';
     }
     return my_options;
}

//	get name by id from array
//	----------------------------------------------------------------------------
JKY.get_name_by_id = function(the_id, the_array) {
	for(var i=0; i<the_array.length; i++) {
		if (the_array[i].id == the_id) {
			return the_array[i].name;
		}
	}
	return null;
}

//	get name by id from array
//	----------------------------------------------------------------------------
JKY.get_index_by_id = function(the_id, the_array) {
	for(var i=0; i<the_array.length; i++) {
		if (the_array[i].id == the_id) {
			return i;
		}
	}
	return null;
}

//        JKY.set_radios(20, 'All', 10, 20, 50, 100, 200, 500, 1000)
//        ----------------------------------------------------------------------
JKY.set_radios = function() {
     radios    = '';
     set_id    = arguments[0];
     set_value = arguments[1];

     for( var i=2; i<arguments.length; i++ ) {
          value = arguments[i];
          checked = (value == set_value) ? ' checked="checked"' : '';
          radios += '<input type="radio" id="' + set_id + '" name="' + set_id + '" value="' + value + '" ' + checked + '/>&nbsp;' + value + ' &nbsp; ';
     }
     return radios;
}

//        JKY.set_checks('...', ..., '...')
//        ----------------------------------------------------------------------
JKY.set_checks = function() {
     checks    = '';
     set_id    = arguments[0];

     for( var i=1; i<arguments.length; i++ ) {
          value = arguments[i];
          checks += '<input type="checkbox" id="' + set_id + '" name="' + set_id + '" value="' + value + '" ' + '/>&nbsp;' + value + ' <br>';
     }
     return checks;
}

/**
 * set 'active' class on specific id of menu
 * @param	id_name
 */
JKY.set_menu_active = function(id_name){
	JKY.hide('jky-side-sales'		);
	JKY.hide('jky-side-production'	);
	JKY.hide('jky-side-help'		);
	JKY.hide('jky-side-admin'		);
	JKY.hide('jky-side-support'		);
	$('#jky-menus li').removeClass('active');
	$('#' + id_name).addClass('active');
}

/**
 * set 'active' class on specific id of side bar
 * @param	id_name
 */
JKY.set_side_active = function(id_name){
	$('#jky-side-bar div').removeClass('active');
	$('#' + id_name).addClass('active');
}

/**
 * get value of specific id
 * @param	id_name
 * @return	value
 */
JKY.get_value = function(id_name){
	return $('#' + id_name).val();
}

/**
 * get value of checkbox or radio checked
 * @param	id_name
 * @return	value
 */
JKY.get_checked = function(id_name){
	return $('input[name=' + id_name + ']:checked').val();
}

/**
 * show specific id name
 * @param	id_name
 */
JKY.show = function(id_name){
//	$('#' + id_name).css('display', 'block');
	$('#' + id_name).show();
}

/**
 * hide specific id name
 * @param	id_name
 */
JKY.hide = function(id_name){
//	$('#' + id_name).css('display', 'none');
	$('#' + id_name).hide();
}

/**
 * hide specific id name
 * @param	id_name
 */
JKY.invisible = function(id_name){
	$('#' + id_name).css('visibility', 'hidden');
}

/**
 * hide specific id name
 * @param	id_name
 */
JKY.visible = function(id_name){
	$('#' + id_name).css('visibility', 'visible');
}

/**
 * return true if specific browser is running
 * @param	browserName
 * @return  true | false
 *
 * @example
 *			JKY.is_browser('msie')
 *			JKY.is_browser('firefox')
 *			JKY.is_browser('chrome')
 *			JKY.is_browser('safari')
 */
JKY.is_browser = function(browserName){
	var myUserAgent = navigator.userAgent.toLowerCase();
	if (myUserAgent.indexOf(browserName) > -1) {
		return true;
	}else{
		return false;
	}
}

/**
 * scroll to top if the table
 * @param	class_name
 */
JKY.scroll_to_top = function(class_name){
	$('.' + class_name).scrollTop(0);
}

/**
 * return true if scroll bar is at end of table
 * @param	class_name
 * @return  true | false
 */
JKY.is_scroll_at_end = function(class_name){
	var my_id = $('.' + class_name)[0];
	var my_offset = my_id.scrollHeight - my_id.scrollTop - my_id.offsetHeight;
	if (my_offset < 0) {
		return true;
	}else{
		return false;
	}
}

/**
 * show confirm layer with message
 * @param	function_yes	(null | callback function if reply = Yes)
 * @param	function_no		(null | callback function if reply = No )
 * @param	message
 *
 * @example JKY.display_confirm
 *				(  JKY.restore_data
 *				,  null
 *				, 'Leaving'
 *				, 'You have <b>unsaved</b> change(s). <br>Do you want to <b>restore</b> this screen without save it?'
 *				, 'Leave Page'
 *				, 'Stay on Page'
 *				);
 */
JKY.display_confirm = function(function_yes, function_no, header, body, label_yes, label_no) {
	JKY.click_confirm = function(reply) {
		$('#jky-confirm').modal('hide');
		if (reply == 'Yes' && typeof(function_yes) == 'function')	{function_yes();}
		if (reply == 'No'  && typeof(function_no ) == 'function')	{function_no ();}
	}
	$('#jky-confirm-header'	).html(header	);
	$('#jky-confirm-body'	).html(body		);
	$('#jky-confirm-yes'	).html(label_yes);
	$('#jky-confirm-no'		).html(label_no	);
	$('#jky-confirm').modal('show');
}

//        JKY.show_layer('login', 'user_name', 200)
//        ----------------------------------------------------------------------
JKY.show_layer = function(layer, field, z_index) {
     var   layer_name = layer + '-layer' ;
     var  shadow_name = layer + '-shadow';
/*
     var  JKY.shadow = document.getElementById(shadow_name);
     if( !JKY.shadow ) {
          JKY.shadow = document.createElement('div');
          JKY.shadow.setAttribute('id', shadow_name);
          JKY.shadow.setAttribute('class', 'shadow');
          document.body.appendChild(JKY.shadow);
     }
*/
     $('#' + shadow_name).show().css('z-index', z_index  );
     $('#' +  layer_name).show().css('z-index', z_index+1);
     JKY.set_focus(field);
     eval('setup_' + layer + '_data();');
}

//        JKY.hide_layer('login')
//        ----------------------------------------------------------------------
JKY.hide_layer = function(layer) {
     var   layer_name = layer + '-layer' ;
     var  shadow_name = layer + '-shadow';
     $('#' +  layer_name).hide();
     $('#' + shadow_name).hide();
}

//        JKY.set_focus('user_name', 100)
//        ----------------------------------------------------------------------
JKY.set_focus = function(the_name, the_delay) {
	var my_id = $('#' + the_name);
	if (my_id && my_id.is(':visible')) {
		var my_delay = (typeof the_delay == 'undefined') ? 0 : the_delay;
		setTimeout( function() {
			my_id.focus();
			my_id.select();
		}, my_delay);
	}else{
		setTimeout( function() {
			JKY.set_focus(the_name, the_delay);
		}, 100);
	}
}

JKY.disabled_id	= function(id_name)	{		$('#' + id_name).addClass	('disabled');}
JKY.enabled_id 	= function(id_name)	{		$('#' + id_name).removeClass('disabled');}
JKY.is_disabled = function(id_name) {return $('#' + id_name).hasClass	('disabled');}

//        JKY.set_...
//        ----------------------------------------------------------------------
JKY.set_is_zero          = function(name)              {return '<br>' + JKY.t( name ) + ' ' + JKY.t( 'is zero'        );}
JKY.set_is_invalid       = function(name)              {return '<br>' + JKY.t( name ) + ' ' + JKY.t( 'is invalid'     );}
JKY.set_is_required      = function(name)              {return '<br>' + JKY.t( name ) + ' ' + JKY.t( 'is required'    );}
JKY.set_already_taken    = function(name)              {return '<br>' + JKY.t( name ) + ' ' + JKY.t( 'already taken'  );}
JKY.set_not_found        = function(name)              {return '<br>' + JKY.t( name ) + ' ' + JKY.t( 'not found'      );}
JKY.set_size_is_under    = function(name, size )       {return '<br>' + JKY.t( name ) + ' ' + JKY.t( 'size is under'  ) + ' [' + size  + ']';}
JKY.set_size_is_above    = function(name, size )       {return '<br>' + JKY.t( name ) + ' ' + JKY.t( 'size is above'  ) + ' [' + size  + ']';}
JKY.set_value_is_under   = function(name, value)       {return '<br>' + JKY.t( name ) + ' ' + JKY.t( 'value is under' ) + ' [' + value + ']';}
JKY.set_value_is_above   = function(name, value)       {return '<br>' + JKY.t( name ) + ' ' + JKY.t( 'value is above' ) + ' [' + value + ']';}

//   Set Languages -------------------------------------------------------------
JKY.set_languages = function() {
     var  options = $('#en-speaking').html();
     if(  options == '' ) {
          setTimeout('JKY.set_languages()', 100);
     } else {
          $('#en-reading' ).html(options);
          $('#en-writing' ).html(options);
          $('#ma-speaking').html(options);
          $('#ma-reading' ).html(options);
          $('#ma-writing' ).html(options);
          $('#tw-speaking').html(options);
          $('#tw-reading' ).html(options);
          $('#tw-writing' ).html(options);
     }
}

/**
 * check if specific id  is loaded
 *
 * @param	id_name
 * @return  true | false
 */
JKY.is_loaded = function(id_name) {
	if ($('#' + id_name + '-loaded').length > 0) {
		return true;
	}else{
		return false;
	}
}

//	check if the_string is empty
JKY.is_empty = function(the_string) {
	if (typeof the_string == 'undefined'
	||  the_string == null
	||  the_string == false
	||  $.trim(the_string) == '') {
		return true;
	}else{
		return false;
	}
}

//        email format xxx@xxx.xxx
JKY.is_email = function(email) {
     var  pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
     return pattern.test(email);
}

//        date format mm/dd/yyyy
JKY.is_date = function(date) {
     var  string = JKY.str_replace('%2F', '/', date);
     var  dates  = string.split('/');
     var  mm   = parseInt(dates[0], 10);
     var  dd   = parseInt(dates[1], 10);
     var  yyyy = parseInt(dates[2], 10);
     var  new_date = new Date(yyyy, mm-1, dd);
     if(( new_date.getFullYear() == yyyy ) && ( new_date.getMonth() == mm-1 ) && ( new_date.getDate() == dd ))
          return true;
     else return false;
}

//        JKY.str_replace
//        ----------------------------------------------------------------------
JKY.str_replace = function(search, replace, subject, count) {
//   note: The count parameter must be passed as a string in order to find a global variable in which the result will be given
//   example 1:  JKY.str_replace( ' ', '.', 'Kevin van Zonneveld' );                          //   returns 1: 'Kevin.van.Zonneveld'
//   example 2:  JKY.str_replace([ '{name}', 'l' ], [ 'hello', 'm' ], '{name}, lars' );       //   returns 2: 'hemmo, mars'
     var  i     = 0
       ,  j     = 0
       ,  temp  = ''
       ,  repl  = ''
       ,  sl    = 0
       ,  fl    = 0
       ,  f     = [].concat(search )
       ,  r     = [].concat(replace)
       ,  s     = subject
       ,  ra    = Object.prototype.toString.call(r) == '[object Array]'
       ,  sa    = Object.prototype.toString.call(s) == '[object Array]'
       ;
     s = [].concat(s);
     if(  count ) {
          this.window[count] = 0;
     }

     for( i=0, sl=s.length; i<sl; i++ ) {
          if(  s[i] == '' ) {
               continue;
          }
          for( j=0, fl=f.length; j<fl; j++ ) {
               temp = s[i] + '';
               repl = ra ? (r[j] != undefined ? r[j] : '') : r[0];
               s[i] = (temp).split(f[j]).join(repl);
               if(  count && s[i] != temp ) {
                    this.window[count] += (temp.length - s[i].length) / f[j].length;
               }
          }
     }
     return sa ? s : s[0];
}

/**
 * set company name
 */
JKY.set_company_name = function(company_name) {
	JKY.set_html('jky-company-name', company_name);
}

/**
 * set user info
 */
JKY.set_user_info = function(full_name) {
	if (full_name == null) {
		JKY.set_html('jky-user-full-name', '');
		JKY.hide('jky-user-logged');
		JKY.show('jky-user-unkown');
	}else{
		var my_full_name = '<a href="#" onclick="JKY.process_profile()">' + full_name + '</a>';
		var my_log_off = ':&nbsp; <a href="#" onclick="JKY.process_log_off()">Log Off</a>';
		JKY.set_html('jky-user-full-name', my_full_name + my_log_off);
		JKY.hide('jky-user-unkown')
		JKY.show('jky-user-logged');
	}
}

/**
 * set company logo
 */
JKY.set_company_logo = function(company_logo) {
	JKY.set_html('jky-company-logo', '<img src="/img/' + company_logo + '" />');
}

/**
 * set event name
 */
JKY.set_event_name = function(event_name) {
	JKY.set_html('jky-event-name', event_name);
}

/**
 * set buttons menus
 */
JKY.set_buttons_menus = function(menus) {
	var my_html = '';
	for(var i=0; i<menus.length; i++) {
		var my_menu = menus[i];
		my_html += '<li id="' + my_menu.id + '">'
				+  '<a onclick="JKY.process_menu(\'' + my_menu.id + '\')" >' +  my_menu.label
//				+  '<i class="icon-' + my_menu.icon + ' icon-white"></i>' + my_menu.label
				+  '</a>'
				+  '</li>'
				;
	}
	JKY.set_html('jky-menus', my_html);
}

/**
 * set buttons control
 */
JKY.set_buttons_control = function(admins, language, languages) {
	var my_html = '';
	if (languages.length > 0) {
		my_html += '<span class="jky-label">Language:</span>';
		my_html += '<select id="jky-control-language">';
		for(var i=0; i<languages.length; i++) {
			var my_language = languages[i];
			var my_selected = (my_language == language) ? ' selected="selected"' : '';
			my_html += '<option value="' + my_language + '"' + my_selected + '>' + my_language + '</option>';
		}
		my_html += '</select>';
	}

	if (admins.length > 0) {
		my_html += '<div class="btn-group">'
				+  '<a class="btn btn-large dropdown-toggle" data-toggle="dropdown" href="#"><i class="icon-tasks icon-white"></i>Admin</a>'
				+  '<ul id="jky-control-admin" class="dropdown-menu">'
				;
		for(var i=0; i<admins.length; i++) {
			var my_admin = admins[i];
			my_html += '<li><a onclick="JKY.display_trace(\'' + my_admin.label + '\')"><i class="icon-' + my_admin.icon + ' icon-white"></i> &nbsp;' + my_admin.label + '</a></li>';
		}
		my_html += '</ul></div>';
	}
	my_html += '<a id="jky-control-tickets" class="btn btn-large"><i class="icon-share icon-white"></i>Tickets</a>';
	JKY.set_html('jky-control', my_html);
}

/**
 * set body header
 */
JKY.set_body_header = function(name, buttons) {
	JKY.set_html('jky-body-name', '<i class="icon-th"></i>' + name);
	var my_html = '';
	for(var i=0; i<buttons.length; i++) {
		var my_button = buttons[i];
		my_html += '<button onclick="JKY.display_trace(\'' + my_button.on_click + '\')" class="btn"><i class="icon-' + my_button.icon + '"></i> ' + my_button.label + '</button>';
	}
	JKY.set_html('jky-body-buttons', my_html);
}

/**
 * set copyright
 */
JKY.set_copyright = function(copyright) {
	JKY.set_html('jky-copyright', copyright);
}

/**
 * set copyright
 */
JKY.set_contact_us = function(contact_us) {
//	JKY.set_html('jky-contact-us', contact_us);
}

/**
 * get ids
 */
JKY.get_ids = function(table) {
	JKY.display_trace('get_ids: ' + table);
	var my_rows = [];
	var my_data =
		{ method	: 'get_ids'
		, table		:  table
		};
	var my_object = {};
	my_object.data = JSON.stringify(my_data);
	$.ajax(
		{ url		: JKY.AJAX_URL
		, data		: my_object
		, type		: 'post'
		, dataType	: 'json'
		, async		: false
		, success	: function(response) {
				if (response.status == 'ok') {
					my_rows = response.rows;
				}else{
					JKY.display_message(response.message);
				}
			}
		, error		: function(jqXHR, text_status, error_thrown) {
				if (typeof function_error != 'undefined') {
					function_error(jqXHR, text_status, error_thrown);
				}else{
					JKY.hide('jky-loading');
					JKY.display_message('Error from backend server, please re-try later.');
				}
			}
		}
	)
	return my_rows;
}

/**
 * get controls
 */
JKY.get_controls = function(group_set) {
	JKY.display_trace('get_controls: ' + group_set);
	var my_rows = [];
	var my_data =
		{ method	: 'get_controls'
		, group_set	:  group_set
		};
	var my_object = {};
	my_object.data = JSON.stringify(my_data);
	$.ajax(
		{ url		: JKY.AJAX_URL
		, data		: my_object
		, type		: 'post'
		, dataType	: 'json'
		, async		: false
		, success	: function(response) {
				if (response.status == 'ok') {
					my_rows = response.rows;
				}else{
					JKY.display_message(response.message);
				}
			}
		, error		: function(jqXHR, text_status, error_thrown) {
				if (typeof function_error != 'undefined') {
					function_error(jqXHR, text_status, error_thrown);
				}else{
					JKY.hide('jky-loading');
					JKY.display_message('Error from backend server, please re-try later.');
				}
			}
		}
	)
	return my_rows;
}

/**
 * get configs
 */
JKY.get_configs = function(group_set) {
	JKY.display_trace('get_configs: ' + group_set);
	var my_rows = [];
	var my_data =
		{ method	: 'get_configs'
		, group_set	:  group_set
		};
	var my_object = {};
	my_object.data = JSON.stringify(my_data);
	$.ajax(
		{ url		: JKY.AJAX_URL
		, data		: my_object
		, type		: 'post'
		, dataType	: 'json'
		, async		: false
		, success	: function(response) {
				if (response.status == 'ok') {
					my_rows = response.rows;
				}else{
					JKY.display_message(response.message);
				}
			}
		, error		: function(jqXHR, text_status, error_thrown) {
				if (typeof function_error != 'undefined') {
					function_error(jqXHR, text_status, error_thrown);
				}else{
					JKY.hide('jky-loading');
					JKY.display_message('Error from backend server, please re-try later.');
				}
			}
		}
	)
	return my_rows;
}

/**
 * set group set
 */
JKY.set_group_set = function(table, selected, group_set) {
	JKY.display_trace('set_control_set: ' + group_set);
	var my_html = '';
	var my_data =
		{ method	: 'get_index'
		, table		:  table
		, order_by	: 'sequence,name'
		, select	:  group_set
		};
	var my_object = {};
	my_object.data = JSON.stringify(my_data);
	$.ajax(
		{ url		: JKY.AJAX_URL
		, data		: my_object
		, type		: 'post'
		, dataType	: 'json'
		, async		: false
		, success	: function(response) {
				if (response.status == 'ok') {
					my_html = '';
					if (selected == 'All') {
						my_html += '<option value="All" selected="selected">All</option>';
					}
					for(var i=0; i<response.rows.length; i+=1) {
						var my_name  = response.rows[i]['name' ];
						var my_value = response.rows[i]['value'];
						if (my_value == '' || group_set == 'User Roles') {
							my_value = my_name;
						}
						var my_selected = (my_name == selected) ? ' selected="selected"' : '';
						my_html += '<option value="' + my_name + '"' + my_selected + '>' + my_value + '</option>';
					}
//					my_html += '<option onclick="JKY.process_option_search(this)"	class="jky-option-search"	>Search More...</option>';
//					my_html += '<option onclick="JKY.process_option_add_new(this)"	class="jky-option-add-new"	>Add New...</option>';
				}else{
					JKY.display_message(response.message);
				}
			}
		, error		: function(jqXHR, text_status, error_thrown) {
				if (typeof function_error != 'undefined') {
					function_error(jqXHR, text_status, error_thrown);
				}else{
					JKY.hide('jky-loading');
					JKY.display_message('Error from backend server, please re-try later.');
				}
			}
		}
	)
	return my_html;
}

/**
 * set table options
 */
JKY.set_table_options = function(table, field, selected, initial) {
	JKY.display_trace('set_table_options: ' + table);
	var my_html = '';
	var my_data =
		{ method	: 'get_options'
		, table		:  table
		, field		:  field
		, selected	:  selected
		, initial	:  initial
		};
	var my_object = {};
	my_object.data = JSON.stringify(my_data);
	$.ajax(
		{ url		: JKY.AJAX_URL
		, data		: my_object
		, type		: 'post'
		, dataType	: 'json'
		, async		: false
		, success	: function(response) {
				if (response.status == 'ok') {
					my_html = '';
					if (initial == null ) {
//						no initial option
					}else{
						if (initial == '' ) {
							my_html += '<option value=""   >' + initial + '</option>';
						}else{
							my_html += '<option value="All">' + initial + '</option>';
						}
					}

					for(var i=0; i<response.rows.length; i+=1) {
						var my_id  	 = response.rows[i]['id' ];
						var my_value = response.rows[i][field];
						var my_selected = (my_id == selected) ? ' selected="selected"' : '';
						my_html += '<option value="' + my_id + '"' + my_selected + '>' + my_value + '</option>';
					}
				}else{
					JKY.display_message(response.message);
				}
			}
		, error		: function(jqXHR, text_status, error_thrown) {
				if (typeof function_error != 'undefined') {
					function_error(jqXHR, text_status, error_thrown);
				}else{
					JKY.hide('jky-loading');
					JKY.display_message('Error from backend server, please re-try later.');
				}
			}
		}
	)
	return my_html;
}

/**
 * process ajax
 *
 * @param	async	(true | false)
 * @param	data	(array)
 * @param	function_success
 * @param	function_error
 */
JKY.ajax = function(async, data, function_success, function_error) {
	var my_object = {};
	my_object.data = JSON.stringify(data);
	$.ajax(
		{ url		: JKY.AJAX_URL
		, data		: my_object
		, type		: 'post'
		, dataType	: 'json'
		, async		: async
		, success	: function(response) {
				if (response.status == 'ok') {
					if (typeof function_success != 'undefined') {
						function_success(response);
					}
				}else{
					var my_messages = response.message.split(':');
					var my_words = my_messages[2].trim().split(' ');
					if (my_words[0] == '1062') {
						JKY.display_message('Error, the key of this record is already taken.');
					}else{
						JKY.display_message(response.message);
					}
				}
			}
		, error		: function(jqXHR, text_status, error_thrown) {
				if (typeof function_error != 'undefined') {
					function_error(jqXHR, text_status, error_thrown);
				}else{
					JKY.hide('jky-loading');
					JKY.display_message('Error from backend server, please re-try later.');
				}
			}
		}
	);
}

JKY.get_row = function(table_name, id) {
	var my_row = null;
	var my_where = table_name + '.id = ' + id;
	var my_data =
		{ method: 'get_row'
		, table	: table_name
		, where : my_where
		};

	var my_object = {};
	my_object.data = JSON.stringify(my_data);
	$.ajax(
		{ url		: JKY.AJAX_URL
		, data		: my_object
		, type		: 'post'
		, dataType	: 'json'
		, async		: false
		, success	: function(response) {
				if (response.status == 'ok') {
					my_row = response.row;
				}else{
					JKY.display_message(response.message);
				}
			}
		, error		: function(jqXHR, text_status, error_thrown) {
				if (typeof function_error != 'undefined') {
					function_error(jqXHR, text_status, error_thrown);
				}else{
					JKY.hide('jky-loading');
					JKY.display_message('Error from backend server, please re-try later.');
				}
			}
		}
	);
	return my_row;
}

JKY.get_rows = function(table_name, id) {
	var my_rows = null;
	var my_where = table_name + '.parent_id = ' + id;
	var my_data =
		{ method: 'get_rows'
		, table	:  table_name
		, where :  my_where
		};

	var my_object = {};
	my_object.data = JSON.stringify(my_data);
	$.ajax(
		{ url		: JKY.AJAX_URL
		, data		: my_object
		, type		: 'post'
		, dataType	: 'json'
		, async		: false
		, success	: function(response) {
				if (response.status == 'ok') {
					my_rows = response.rows;
				}else{
					JKY.display_message(response.message);
				}
			}
		, error		: function(jqXHR, text_status, error_thrown) {
				if (typeof function_error != 'undefined') {
					function_error(jqXHR, text_status, error_thrown);
				}else{
					JKY.hide('jky-loading');
					JKY.display_message('Error from backend server, please re-try later.');
				}
			}
		}
	);
	return my_rows;
}

/**
 * process profile
 */
JKY.process_profile = function() {
	JKY.display_trace('process_profile');
	JKY.display_message('soon: Process Profile');
}

/**
 * process log off
 */
JKY.process_log_off = function() {
	JKY.display_trace('process_log_off');
	JKY.hide('jky-side-bar');
	JKY.set_buttons_menus([]);
	JKY.set_user_info(null);
	var my_data = { method : 'log_out'};
	JKY.ajax(false, my_data, JKY.process_log_off_success);
}

/**
 * process log off success
 */
JKY.process_log_off_success = function() {
	JKY.process_action('login');
}

/**
 * process export
 */
JKY.run_export = function(table, select, filter, specific, sort_by) {
	if ($('#jky-export').length == 0)	{
		$('body').append('<div id="jky-export"></div>');
	}
	var my_html = ''
		+ '<form id="jky-export-form" action="jky_export.php" method="post">'
		+ '<input type="hidden" name="table"    value="' + table	+ '" />'
		+ '<input type="hidden" name="select"   value="' + select	+ '" />'
		+ '<input type="hidden" name="filter"   value="' + filter	+ '" />'
		+ '<input type="hidden" name="display"  value="' + 1000		+ '" />'
		+ '<input type="hidden" name="specific" value="' + specific	+ '" />'
		+ '<input type="hidden" name="order_by" value="' + sort_by	+ '" />'
		+ '</form>'
		;
	$('#jky-export').html(my_html);
	$('#jky-export-form').submit();
};

JKY.get_id = function(table, where) {
	var my_id = null;
	var my_data =
		{ method: 'get_id'
		, table	: table
		, where : where
		};

	var my_object = {};
	my_object.data = JSON.stringify(my_data);
	$.ajax(
		{ url		: JKY.AJAX_URL
		, data		: my_object
		, type		: 'post'
		, dataType	: 'json'
		, async		: false
		, success	: function(response) {
				if (response.status == 'ok') {
					my_id = response.id;
				}else{
					JKY.display_message(response.message);
				}
			}
		, error		: function(jqXHR, text_status, error_thrown) {
				if (typeof function_error != 'undefined') {
					function_error(jqXHR, text_status, error_thrown);
				}else{
					JKY.display_message('Error from backend server, please re-try later.');
				}
			}
		}
	);
	return my_id;
}

JKY.get_value_by_id = function(table, field, id) {
	var my_value = '';
	var my_data =
		{ method: 'get_value'
		, table	: table
		, field	: field
		, where : 'id = ' + id
		};

	var my_object = {};
	my_object.data = JSON.stringify(my_data);
	$.ajax(
		{ url		: JKY.AJAX_URL
		, data		: my_object
		, type		: 'post'
		, dataType	: 'json'
		, async		: false
		, success	: function(response) {
				if (response.status == 'ok') {
					my_value = response.value;
				}else{
					JKY.display_message(response.message);
				}
			}
		, error		: function(jqXHR, text_status, error_thrown) {
				if (typeof function_error != 'undefined') {
					function_error(jqXHR, text_status, error_thrown);
				}else{
					JKY.display_message('Error from backend server, please re-try later.');
				}
			}
		}
	);
	return my_value;
}

/* -------------------------------------------------------------------------- */

/**
 * start program
 */
JKY.start_program = function(jky_program) {
	JKY.display_trace('start_program - ' + jky_program);
	JKY.set_all_events(jky_program);
	JKY.set_initial_values(jky_program);
}

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function(jky_program) {
	JKY.display_trace('set_all_events');
	if (JKY.is_loaded('jky-body')) {
		$('#jky-app-select'		).change(function() {JKY.change_select  (this);});
		$('#jky-app-filter'		).change(function() {JKY.change_filter  (this);});
		$('#jky-action-add-new'	).click (function() {JKY.process_add_new	();});
		$('#jky-action-save'	).click (function() {JKY.process_save		();});
		$('#jky-action-delete'	).click (function() {JKY.process_delete		();});
		$('#jky-action-cancel'	).click (function() {JKY.process_cancel		();});
		$('#jky-action-export'	).click (function() {JKY.process_export		();});
		$('#jky-action-publish'	).click (function() {JKY.process_publish	();});	// not needed on version 0
		$('#jky-action-prev'	).click (function() {JKY.display_prev		();});
		$('#jky-action-next'	).click (function() {JKY.display_next		();});
		$('#jky-action-list'	).click (function() {JKY.display_list		();});
		$('#jky-action-form'	).click (function() {JKY.display_form	   (1);});
		$('#jky-action-comment'	).click (function() {JKY.process_comment	();});	// not done
		$('#jky-check-all'		).click (function() {JKY.process_check_all	();});	// not needed on version 0

		if (jky_program == 'Customers')	{$('#jky-is-company').click	(function() {JKY.display_company(this);});		}
	}else{
		setTimeout(function() {JKY.set_all_events();}, 100);
	}
}

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function(jky_program) {
	JKY.display_trace('set_initial_values');
	if (JKY.is_loaded('jky-body')) {
		switch(jky_program) {
			case 'Customers'	:
				JKY.show('jky-side-sales');
				JKY.set_menu_active('jky-menu-sales');
				JKY.set_side_active('jky-sales-customers');
				JKY.set_html('jky-state'  , JKY.set_group_set('Configs', '', 'States'	));
				JKY.set_html('jky-country', JKY.set_group_set('Configs', '', 'Countries'));
				break;
			case 'Machines' :
				JKY.show('jky-side-production');
				JKY.set_menu_active('jky-menu-production');
				JKY.set_side_active('jky-production-machines');
//				JKY.set_html('jky-machine-type' , JKY.set_radio('Configs', '', 'Machine Types' ));
				JKY.set_html('jky-machine-brand', JKY.set_group_set('Configs', '', 'Machine Brands'));
				break;
		}
		JKY.set_html('jky-app-breadcrumb', jky_program);
		JKY.display_list();

//		JKY.show('jky-side-sales');
		JKY.show('jky-action-add-new');
	}else{
		setTimeout(function() {JKY.set_initial_values();}, 100);
	}
}

JKY.display_list = function() {
	JKY.load_table();
	JKY.show('jky-app-filter'		);
	JKY.show('jky-app-more'			);
	JKY.hide('jky-app-navs'			);
	JKY.hide('jky-app-add-new'		);
	JKY.show('jky-action-add-new'	);
	JKY.hide('jky-action-save'		);
	JKY.hide('jky-action-delete'	);
	JKY.hide('jky-action-cancel'	);
	JKY.show('jky-app-table'		);
	JKY.hide('jky-app-form'			);
}

JKY.display_form = function(index) {
	JKY.display_row(index);
	JKY.hide('jky-app-filter'		);
	JKY.hide('jky-app-more'			);
	JKY.show('jky-app-navs'			);
	JKY.hide('jky-app-add-new'		);
	JKY.show('jky-app-counters'		);
	JKY.hide('jky-action-add-new'	);
	JKY.show('jky-action-save'		);
	JKY.show('jky-action-delete'	);
	JKY.show('jky-action-cancel'	);
	JKY.hide('jky-app-table'		);
	JKY.show('jky-app-form'			);
}
