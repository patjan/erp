/**
 * delay time for Keyup Delay time
 */
$.fn.KeyUpDelay = function( cb, delay ){
	if (delay == null){
		delay = 500;
	};
	var timer = 0;
	return $(this).on('keyup', function(){
		clearTimeout(timer);
		timer = setTimeout( cb , delay );
	});
};

/**
 * numeric only control handler
 *
 * $('#yourTextBoxName').ForceIntegerOnly();
 */
$.fn.ForceIntegerOnly = function(){
	return this.each(function(){
		$(this).keydown(function(e){
			var key = e.charCode || e.keyCode || 0;
			// allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
			// home, end, and numpad decimal
			return (
				 key == 8 || key == 9 || key == 46 ||
				(key >= 35 && key <= 40) ||
				(key >= 48 && key <= 57) ||
				(key >= 96 && key <= 105)
			);
		});
	});
};

/**
 * numeric only control handler
 *
 * $('#yourTextBoxName').ForceNumericOnly();
 */
$.fn.ForceNumericOnly = function(){
	return this.each(function(){
		$(this).keydown(function(e){
			var key = e.charCode || e.keyCode || 0;
			// allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
			// home, end, period, and numpad decimal
			return (
				 key == 8 || key == 9 || key == 46 || key == 110 || key == 190 ||
				(key >= 35 && key <= 40) ||
				(key >= 48 && key <= 57) ||
				(key >= 96 && key <= 105)
			);
		});
	});
};

//<input type="number" value="0"> 						float
//<input type="number" value="0" min="0"> 				positive
//<input type="number" value="0" min="0" step="1"> 		positive integer

/**
 * return checked value(s)
 */
$.fn.GetCheckedValues = function() {
	return $.map(this, function(elem) {
		return elem.value || '';
//	}).join( ',' );
	});
};

/**
 * intercept on enter key
 */
$.fn.OnEnterKey = function(closure) {
	$(this).keypress(
		function(event) {
			var code = event.keyCode ? event.keyCode : event.which;
			if (code == 13) {
				closure();
				return false;
			}
		}
	);
};