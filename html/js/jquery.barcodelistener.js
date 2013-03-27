/* **************************************************************************************
   * BarcodeListener v 1.1 (jQuery plug-in)                                             *
   * http://code.google.com/p/jquery-barcodelistener/                                   *
   *                                                                                    *
   * how to setup the plugin http://code.google.com/p/jquery-barcodelistener/wiki/setup * 
   *                                                                                    *
   * made by Gregorio Pellegrino                                                        *
   *         gregoriopellegrino.com                                                     *
   *         mail@gregoriopellegrino.com                                                *
   *                                                                                    *
   * relased under Apache License 2.0 (http://www.apache.org/licenses/LICENSE-2.0)      *
   ************************************************************************************** */
   
$(function() {
	jQuery.fn.BarcodeListener = function(options, callback) {
					
		//initalize variables
		char0 = new Array("§",  "32");
		char1 = new Array("~", "732");
		settings = new Array(char0, char1);
		if (options) {
			jQuery.extend(settings, options);
		}
					
		// append body
		$('body').append('<form id="inp_form" style="opacity:0;"><input type="text" name="inp_text" id="inp_text" /></form>');
					
		// intercept barcode reader with sequence character §~
		$(document).keypress(function(evt) {
			if (evt.which == settings[0][1]) {
				if (settings.length-1 > 0) {
					index = 1;
					result = true;
					while ((index < settings.length) && (result == true)) {
						$(document).keypress(function(evt) {
							if (evt.which == settings[index][1]) {
								result = true;
							}else{
								result = false;	
							}
						});
						index++;
					}
					if (result == true) {
						$("#inp_text").val("").focus();
					}
				}else{
					$("#inp_text").val("").focus();
				}

				// event propagation
                evt.cancelBubble = true;
                evt.returnValue = false;

                if (evt.stopPropagation) {
                    evt.stopPropagation();
                    evt.preventDefault();
                }
			}
		});

		// intercept form submit
		$("#inp_form").submit(function() {
			code = $("#inp_text").val();
			for (i=0; i<settings.length; i++) {
				reg_exp = new RegExp(settings[i][0]);
				code = code.replace(reg_exp, "");
			}

			// return callback
			if (typeof(callback) == "function") {
				callback(code);
			}

			return false;
		});
	}
})(jQuery);