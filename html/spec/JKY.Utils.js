describe("JKY.Utils.js", function() {
	var timerCallback;

	beforeEach(function() {
		timerCallback = jasmine.createSpy("timerCallback");
		jasmine.clock().install();
	});

	afterEach(function() {
		jasmine.clock().uninstall();
	});

	it("should define object JKY"					, function() {expect(JKY								).toBeDefined();});
	it("should define object JKY.AJAX_APP"			, function() {expect(JKY.AJAX_APP						).toBeDefined();});
	it("should define object JKY.AJAX_URL"			, function() {expect(JKY.AJAX_URL						).toBeDefined();});
/*
	describe("test JKY.fix_flag", function() {
		it("empty should return empty"				, function() {expect(JKY.fix_flag(						)).toEqual('&nbsp;'	 );});
		it("null should return empty"				, function() {expect(JKY.fix_flag(null					)).toEqual('&nbsp;'	 );});
		it("'t' should return true"					, function() {expect(JKY.fix_flag('t', true, false		)).toBeTruthy		();});
		it("'f' should return false"				, function() {expect(JKY.fix_flag('f', true, false		)).toBeFalsy		();});
		it("'t' should return Yes"					, function() {expect(JKY.fix_flag('t', 'Yes', 'No'		)).toEqual('Yes'	 );});
		it("'f' should return No"					, function() {expect(JKY.fix_flag('f', 'Yes', 'No'		)).toEqual('No'		 );});
		it("'x' should return Any"					, function() {expect(JKY.fix_flag('x', 'Yes', 'Any'		)).toEqual('Any'	 );});
	});

	describe("test JKY.fix_br", function() {
		it("empty should return empty"				, function() {expect(JKY.fix_br(						)).toEqual('&nbsp;'	 );});
		it("null should return empty"				, function() {expect(JKY.fix_br(null					)).toEqual('&nbsp;'	 );});
		it("number should return number"			, function() {expect(JKY.fix_br(1234567890				)).toEqual(1234567890);});
		it("no space should return original"		, function() {expect(JKY.fix_br('word1word2'			)).toEqual('word1word2');});
		it("space should return <br />"				, function() {expect(JKY.fix_br('word1 word2'			)).toEqual('word1<br />word2');});
	});

	describe("test JKY.fix_date", function() {
		it("empty should return empty"				, function() {expect(JKY.fix_date(						)).toEqual('&nbsp;'	 );});
		it("null should return empty"				, function() {expect(JKY.fix_date(null					)).toEqual('&nbsp;'	 );});
		it("date should return date"				, function() {expect(JKY.fix_date('01-12-2014'			)).toEqual('01-12-2014');});
		it("' @ ' should return <br >"				, function() {expect(JKY.fix_date('01-12-2014 @ 12:35'	)).toEqual('01-12-2014<br />12:35');});
		it("' @'  should be drop out"				, function() {expect(JKY.fix_date('01-12-2014 @12:35'	)).toEqual('01-12-2014 12:35');});
	});

	describe("test JKY.fix_full_name", function() {
		it("no name should return empty"			, function() {expect(JKY.fix_full_name('tr ', null, null		)).toEqual('&nbsp;'	);});
		it("no first should return empty"			, function() {expect(JKY.fix_full_name('tr ', null, 'last'	)).toEqual('&nbsp;'	);});
		it("no last should return empty"			, function() {expect(JKY.fix_full_name('tr ', 'first', null	)).toEqual('&nbsp;'	);});
		it("first last should return with trailer"	, function() {expect(JKY.fix_full_name('tr ', 'first', 'last')).toEqual('tr last, first');});
	});

	describe("test JKY.fix_null", function() {
		it("empty should return empty"				, function() {expect(JKY.fix_null(						)).toEqual(''	);});
		it("null should return empty"				, function() {expect(JKY.fix_null(null					)).toEqual(''	);});
		it("'null' should return empty"			    , function() {expect(JKY.fix_null('null'				)).toEqual(''	);});
		it("string should return original"		    , function() {expect(JKY.fix_null('string'				)).toEqual('string');});
	});

    describe("test JKY.fix_ymd2dmy", function() {
        it("empty should return empty"				, function() {expect(JKY.fix_ymd2dmy(					)).toEqual(''	);});
        it("null should return empty"				, function() {expect(JKY.fix_ymd2dmy(null				)).toEqual(''	);});
        it("'null' should return empty"				, function() {expect(JKY.fix_ymd2dmy('null'			    )).toEqual(''	);});
        it("space should return empty"				, function() {expect(JKY.fix_ymd2dmy('    '             )).toEqual(''   );});
        it("yyyy-mm-dd should return dd-mm-yyyy"	, function() {expect(JKY.fix_ymd2dmy('2011-07-17' 	    )).toEqual('17-07-2011');});
    });

	describe("test JKY.fix_dmy2ymd", function() {
        it("empty should return empty"				, function() {expect(JKY.fix_dmy2ymd(					)).toEqual(''	);});
		it("null should return empty"				, function() {expect(JKY.fix_dmy2ymd(null				)).toEqual(''   );});
		it("'null' should return empty"				, function() {expect(JKY.fix_dmy2ymd('null'		    	)).toEqual(''   );});
        it("space should return empty"				, function() {expect(JKY.fix_dmy2ymd('    '				)).toEqual(''   );});
		it("dd-mm-yyyy should return yyyy-mm-dd"	, function() {expect(JKY.fix_dmy2ymd('17-07-2011'		)).toEqual('2011-07-17');});
	});

    describe("test JKY.out_float", function(){
        it("null should return empty"				, function() {expect(JKY.out_float(null  				)).toEqual(''	);});
        it("12 should return 12"					, function() {expect(JKY.out_float('12'					)).toEqual(12	);});
        it("12.00 should return 12.00"				, function() {expect(JKY.out_float('12.00'				)).toEqual(12.00);});
        it("12.34 should return 12.34"				, function() {expect(JKY.out_float(12.34				)).toEqual(12.34);});
        it("12 13 14 should return 12"				, function() {expect(JKY.out_float('12 13 14'			)).toEqual(12	);});
        it(" 12  should return 12"				    , function() {expect(JKY.out_float(' 12 '				)).toEqual(12	);});
        it("12 years should return 12"				, function() {expect(JKY.out_float('12 years'			)).toEqual(12	);});
        it("He was 12 should return NaN"			, function() {expect(JKY.out_float('He was 12'			)).toEqual(NaN	);});
    });

    describe("test JKY.out_date", function() {
        it("null should return empty", function() {
            expect(JKY.out_date(null)).toEqual('');
        });
        it("yyyy-mm-dd hh:mm:ss should return mm-dd-yyyy, locale = US", function() {
            JKY.Session.set_locale('en_US');
            expect(JKY.out_date('2014-07-17 12:34:56')).toEqual('07-17-2014');
        });

        it("yyyy-mm-dd hh:mm:ss should return dd-mm-yyyy, locale = BR", function() {
            JKY.Session.set_locale('pt_BR');
            expect(JKY.out_date('2014-07-17 12:34:56')).toEqual('17-07-2014');
        });
    });

    describe("test JKY.out_time", function() {
        it("null should return empty", function() {
            expect(JKY.out_time(null)).toEqual('');
        });
        it("yyyy-mm-dd hh:mm:ss should return mm-dd-yyyy hh:mm, locale = US", function() {
            JKY.Session.set_locale('en_US');
            expect(JKY.out_time('2014-07-17 12:34:56')).toEqual('07-17-2014 12:34');
        });

        it("yyyy-mm-dd hh:mm:ss should return dd-mm-yyyy hh:mm, locale = BR", function() {
            JKY.Session.set_locale('pt_BR');
            expect(JKY.out_time('2014-07-17 12:34:56')).toEqual('17-07-2014 12:34');
        });
    });

    describe("test JKY.short_date", function() {
        it("null should return empty", function() {
            expect(JKY.short_date(null)).toEqual('');
        });
        it("yyyy-mm-dd hh:mm:ss should return mm-dd-yyyy, locale = US", function() {
            JKY.Session.set_locale('en_US');
            expect(JKY.short_date('2014-07-08 12:34:56')).toEqual('07-08-2014');
        });

        it("yyyy-mm-dd hh:mm:ss should return dd-mm-yyyy, locale = BR", function() {
            JKY.Session.set_locale('pt_BR');
            expect(JKY.short_date('2014-07-08 12:34:56')).toEqual('08-07-2014');
        });

        it("yyyy-mm-dd hh:mm:ss should return mm-dd hh:mm, locale = US", function() {
            JKY.Session.set_locale('en_US');
            var my_date = JKY.get_date();
            var my_mm = my_date.substr(5, 2);
            var my_dd = my_date.substr(8, 2);
            expect(JKY.short_date(my_date + ' 12:34:56')).toEqual(my_mm + '-' + my_dd + '&nbsp;12:34');
        });

        it("yyyy-mm-dd hh:mm:ss should return dd-mm hh:mm, locale = BR", function() {
            JKY.Session.set_locale('pt_BR');
            var my_date = JKY.get_date();
            var my_mm = my_date.substr(5, 2);
            var my_dd = my_date.substr(8, 2);
            expect(JKY.short_date(my_date + ' 12:34:56')).toEqual(my_dd + '-' + my_mm + '&nbsp;12:34');
        });
    });

    describe("test JKY.set_date", function() {

    });

    describe("test JKY.inp_date", function() {
        it("mm-dd-yyyy should return yyyy-mm-dd, locale = US", function() {
            JKY.Session.set_locale('en_US');
            expect(JKY.inp_date('my_time_us')).toEqual("'2011-08-21'");
        });

        it("dd-mm-yyyy should return yyyy-mm-dd, locale = BR", function() {
            JKY.Session.set_locale('pt_BR');
            expect(JKY.inp_date('my_time_br')).toEqual("'2011-08-21'");
        });
    });

    describe("test JKY.inp_date_value", function() {
        it("mm-dd-yyyy should return yyyy-mm-dd, locale = US", function() {
            JKY.Session.set_locale('en_US');
            expect(JKY.inp_date_value('07-17-2014')).toEqual("'2014-07-17'");
        });

        it("dd-mm-yyyy should return yyyy-mm-dd, locale = BR", function() {
            JKY.Session.set_locale('pt_BR');
            expect(JKY.inp_date_value('17-07-2014')).toEqual("'2014-07-17'");
        });
    });

    describe("test JKY.inp_time", function() {
        it("mm-dd-yyyy hh:mm should return yyyy-mm-dd hh:mm, locale = US", function() {
            JKY.Session.set_locale('en_US');
            expect(JKY.inp_time('my_time_us')).toEqual("'2011-08-21 11:34'");
        });

        it("dd-mm-yyyy hh:mm should return yyyy-mm-dd hh:mm, locale = BR", function() {
            JKY.Session.set_locale('pt_BR');
            expect(JKY.inp_time('my_time_br')).toEqual("'2011-08-21 11:34'");
        });
    });

    describe("test JKY.inp_time_value", function() {
        it("mm-dd-yyyy hh:mm should return yyyy-mm-dd hh:mm, locale = US", function() {
            JKY.Session.set_locale('en_US');
            expect(JKY.inp_time_value('07-17-2014 12:34')).toEqual("'2014-07-17 12:34'");
        });

        it("dd-mm-yyyy hh:mm should return yyyy-mm-dd hh:mm, locale = BR", function() {
            JKY.Session.set_locale('pt_BR');
            expect(JKY.inp_time_value('17-07-2014 12:34')).toEqual("'2014-07-17 12:34'");
        });
    });

    describe("test JKY.display_message", function() {
        it("mm-dd-yyyy hh:mm should return yyyy-mm-dd hh:mm, locale = US", function() {
            JKY.Session.set_locale('en_US');
            expect(JKY.inp_time_value('07-17-2014 12:34')).toEqual("'2014-07-17 12:34'");
        });

        it("dd-mm-yyyy hh:mm should return yyyy-mm-dd hh:mm, locale = BR", function() {
            JKY.Session.set_locale('pt_BR');
            expect(JKY.inp_time_value('17-07-2014 12:34')).toEqual("'2014-07-17 12:34'");
        });
    });

    describe("test JKY.inp_time_value", function() {
        it("mm-dd-yyyy hh:mm should return yyyy-mm-dd hh:mm, locale = US", function() {
            JKY.Session.set_locale('en_US');
            expect(JKY.inp_time_value('07-17-2014 12:34')).toEqual("'2014-07-17 12:34'");
        });

        it("dd-mm-yyyy hh:mm should return yyyy-mm-dd hh:mm, locale = BR", function() {
            JKY.Session.set_locale('pt_BR');
            expect(JKY.inp_time_value('17-07-2014 12:34')).toEqual("'2014-07-17 12:34'");
        });
    });

    describe("test JKY.get_now", function() {
        it("get the date and time return yyyy-mm-dd hh:mm:ss", function() {
            var my_time = new Date();
            var my_year = my_time.getFullYear();
            var my_month = my_time.getMonth() +1;
            if (my_month < 10) {
                my_month = '0' + my_month;
            }
            var my_day = my_time.getDate();
            var my_hour = my_time.getHours();
            var my_min = my_time.getMinutes();
            var my_sec = my_time.getSeconds();
            var my_result = my_year + '-' + my_month + '-' + my_day + ' ' + my_hour + ':' + my_min + ':' + my_sec;

            expect(JKY.get_now()).toEqual(my_result);
        });
    });

    describe("test JKY.get_date", function() {
        it("get the date return yyyy-mm-dd", function() {
            var my_time = new Date();
            var my_year = my_time.getFullYear();
            var my_month = my_time.getMonth() +1;
            if (my_month < 10) {
                my_month = '0' + my_month;
            }
            var my_day = my_time.getDate();
            var my_result =  my_year + '-' + my_month + '-' + my_day;
            expect(JKY.get_date()).toEqual(my_result);
        });
    });

    describe("test JKY.get_time", function() {
        it("get time return hh:mm:ss", function() {
            var my_time = new Date();
            var my_hour = my_time.getHours();
            var my_min = my_time.getMinutes();
            if (my_min < 10) {
                my_min = '0' + my_min;
            }
            var my_sec = my_time.getSeconds();
            if (my_sec< 10) {
                my_sec = '0' + my_sec;
            }
            var my_result = my_hour + ':' + my_min + ':' + my_sec;
            expect(JKY.get_time()).toEqual(my_result);
        });
    });


    describe("test JKY.set_html", function() {
        it("set the html", function() {
            JKY.set_html('my_text', 'Update Text');
            expect(JKY.get_html('my_text')).toEqual("Update Text");
        });
    });

    describe("test JKY.get_text", function() {
        it("get text return html", function() {
            JKY.set_html('my_text', 'My Text');
            expect(JKY.get_text('my_text')).toEqual("My Text");
        });
    });

    describe("test JKY.get_html", function() {
        it("get the html return html", function() {
            JKY.set_html ('my_text', 'My Html');
            expect(JKY.get_html('my_text')).toEqual("My Html");
        });
    });

    describe("test JKY.append_html", function() {
        it("append the html", function() {
            JKY.append_html('my_text', ' Appended');
            expect(JKY.get_html('my_text')).toEqual('My Html Appended');
        });
    });

    describe("test JKY.append_file", function() {
        it("append the file", function() {
            JKY.append_file('my_text', ' Appended');
            expect(JKY.get_html('my_text')).toEqual('My Html Appended');
        });
    });


    describe("test JKY.prepend_html", function() {
        it("prepend the html", function() {
            JKY.prepend_html('my_text', 'Prepended ');
            expect(JKY.get_html('my_text')).toEqual('Prepended My Html Appended');
        });
    });

    describe("test JKY.set_title", function() {
        it("set the html", function() {
            JKY.set_title('my_text', 'Set');
            expect(JKY.get_html('set_title')).toEqual('Title Name');
        });
    });

    describe("test JKY.set_src", function() {
        it("set the src", function() {
            JKY.set_src('my_text', 'Set');
            expect(JKY.get_html('set_src')).toEqual('Source Set');
        });
    });

    describe("test JKY.set_css", function() {
        it("set the css", function() {
            JKY.set_css('my_text', 'Set');
            expect(JKY.get_html('set_css')).toEqual('CSS Set');
        });
    });

    describe("test JKY.has_attr", function() {
        it("check if it has attr", function() {
            expect(JKY.has_attr('my_text', 'joeljan')).toBeTruthy();
            expect(JKY.has_attr('my_text', 'img')).toBeFalsy();
        });
    });

    describe("test JKY.has_class", function() {
        it("check if it has class", function() {
            expect(JKY.has_class('my_text', '1st')).toBeTruthy();
            expect(JKY.has_class('my_text', '2nd')).toBeTruthy();
            expect(JKY.has_class('my_text', '3rd')).toBeTruthy();
            expect(JKY.has_class('my_text', '4th')).toBeFalsy();
        });
    });

    describe("test JKY.remove_attr", function() {
        it("remove the attr", function() {
            expect(JKY.has_attr('my_text', 'joeljan')).toBeTruthy();
            JKY.remove_attr('my_text', 'joeljan');
            expect(JKY.has_attr('my_text', 'joeljan')).toBeFalsy();
        });
    });

    describe("test JKY.get_value", function() {
        it("get the value", function() {
            expect(JKY.get_value('my_input')).toEqual('my_value');
        });
    });

    describe("test JKY.set_value", function() {
        it("set the value", function() {
            JKY.set_value('my_input', 'new_value');
            expect(JKY.get_value('my_input')).toEqual('new_value');
        });
    });

    describe("test JKY.get_yes_no", function() {
        it("get yes or no", function() {
            expect(JKY.get_yes_no('my_checkbox')).toEqual('Yes');
            expect(JKY.get_yes_no('my_checkbox')).not.toEqual('No');
            expect(JKY.get_yes_no('my_box')).toEqual('No');
        });
    });

    describe("test JKY.set_yes", function() {
        it("set the value to yes", function() {
            JKY.set_yes('my_box', 'Yes');
            expect(JKY.get_yes_no('my_box')).toEqual('Yes');
        });
    });

    describe("test JKY.get_selected_text", function() {
        it("get the selected text", function() {
            expect(JKY.get_value('my_input')).toEqual('my_value');
        });
    });

THERE IS A BUG IN HERE
THERE IS A BUG IN HERE
THERE IS A BUG IN HERE
    describe("test JKY.set_radio", function() {
        it("set the radio", function() {
            expect(JKY.get_yes_no('my_radio')).toEqual('No');
            JKY.set_radio('my_radio', 'box1');
            expect(JKY.get_yes_no('my_radio')).toEqual('Yes');
        });
    });
THERE IS A BUG IN HERE
THERE IS A BUG IN HERE
THERE IS A BUG IN HERE

    describe("test JKY.set_option", function() {
        it("set the option to option2", function() {
            JKY.set_option('my_select', 'option2');
            expect(JKY.get_selected_text('my_select')).toEqual('Option 2');
        });
    });

    describe("test JKY.set_options", function() {
        it("generate options", function() {
            var my_options = JKY.set_options('20', 'All', '10', '20', '50', '100', '200', '500', '1000');
            JKY.set_html('my_select', my_options);
            JKY.set_option('my_select', 'ALL');
            expect(JKY.get_selected_text('my_select')).toEqual('All');
        });
    });

    describe("test JKY.set_options_array", function() {
        it("set array options", function() {
            var my_array =
                [{'id': 1, 'name': 'John'}
                ,{'id': 2, 'name': 'James'}
                ,{'id': 3, 'name': 'Jarred'}
                ,{'id': 4, 'name': 'Jack'}
                ];
            var my_options = JKY.set_options_array('Jarred', my_array, false);
            JKY.set_html('my_select', my_options);
            expect(JKY.get_selected_text('my_select')).toEqual('Jarred');
        });
    });

THERE IS A BUG IN HERE
THERE IS A BUG IN HERE
THERE IS A BUG IN HERE
    describe("test JKY.get_name_by_id", function() {
        it("get the name by id from array", function() {
            expect(JKY.get_id('my_input')).toEqual('my_value');
        });
    });
THERE IS A BUG IN HERE
THERE IS A BUG IN HERE
THERE IS A BUG IN HERE

    describe("test JKY.get_index_by_id", function() {
        it("get the selected index by id", function() {
            expect(JKY.get_value('my_input')).toEqual('my_value');
        });
    });

    describe("test JKY.set_radios", function() {
        it("set radios", function() {
            var my_options = JKY.set_radios('club', '50', '10', '20', '50', '100', '200', '500', '1000');
            JKY.set_html('my_radios', my_options);
            JKY.set_radios('my_radios', '50');
            expect(JKY.get_checked('club')).toEqual('50');
        });
    });

    THERE IS A BUG IN HERE
    THERE IS A BUG IN HERE
    THERE IS A BUG IN HERE
    describe("test JKY.set_radios_array", function() {
        it("set radio array", function() {
            var my_array =
                [    {'id': 1, 'name': 'John'}
                    ,{'id': 2, 'name': 'James'}
                    ,{'id': 3, 'name': 'Jarred'}
                    ,{'id': 4, 'name': 'Jack'}
                ];
            var my_options = JKY.set_radios_array('my_radios', my_array);
            JKY.set_html('my_radios', my_options);
            JKY.set_radio ('my_radios', 'Jarred');
            expect(JKY.get_value('my_radios')).toEqual('Jarred');
        });
    });
    THERE IS A BUG IN HERE
    THERE IS A BUG IN HERE
    THERE IS A BUG IN HERE

    describe("test JKY.set_menu_active", function() {
        it("set an active menu", function() {
            JKY.set_menu_active('jky-menu-threads', '');
            expect(JKY.has_class('jky-menu-production', 'active')).toBeFalsy();
            expect(JKY.has_class('jky-menu-threads', 'active')).toBeTruthy();
            expect(JKY.has_class('jky-menu-boxes', 'active')).toBeFalsy();
        });
    });

    describe("test JKY.set_side_active", function() {
        it("set an active side menu", function() {
            JKY.set_side_active('jky-menu-threads', '');
            expect(JKY.has_class('jky-menu-production', 'active')).toBeFalsy();
            expect(JKY.has_class('jky-menu-threads', 'active')).toBeTruthy();
            expect(JKY.has_class('jky-menu-boxes', 'active')).toBeFalsy();
        });
    });

    describe("test JKY.get_checked", function() {
        it("return the value of the checkbox or radio", function() {
            expect(JKY.get_checked('my_checkbox')).toEqual('yes');
        });
    });

    describe("test JKY.set_active", function() {
        it("set the active function then check for it ", function() {
            JKY.set_active('my_box2');
            expect(JKY.has_class('my_box2', 'active')).toBeTruthy();
        });
    });

    describe("test JKY.reset_active", function() {
        it("reset the active function then check for it ", function() {
            JKY.reset_active('my_box2');
            expect(JKY.has_class('my_box2', 'active')).toBeTruthy();
        });
    });

    describe("test JKY.reset_all_active", function() {
        it("reset all the active functions then check for them ", function() {
            JKY.reset_all_active('my_box2');
            expect(JKY.has_class('my_box2', 'active')).toBeTruthy();
        });
    });

    describe("test JKY.show", function() {
        it("show the specific ID names", function() {
            JKY.show('my_box2');
            expect(JKY.has_class('my_box2', 'active')).toBeTruthy();
        });
    });

    describe("test JKY.hide", function() {
        it("hide the specific ID names", function() {
            JKY.hide('my_box2');
            expect(JKY.has_class('my_box2', 'active')).toBeTruthy();
        });
    });
*/

    describe("test JKY.collapse", function() {
        it("Collapse the side bar", function() {
            JKY.collapse('my_box2');
            expect(JKY.has_class('my_box2', 'active')).toBeFalsy();
        });
    });

    describe("test JKY.invisible", function() {
        it("Hide specific id names", function() {
            JKY.invisible('my_box2');
            expect(JKY.has_class('visibility', 'hidden')).toBeTruthy();
        });
    });

    describe("test JKY.visible", function() {
        it("Show specific id names", function() {
            JKY.visible('my_box2');
            expect(JKY.has_class('visibility', 'shown')).toBeTruthy();
        });
    });
});
