describe("JKY.Utils.js", function() {
	var timerCallback;

	beforeEach(function() {
		timerCallback = jasmine.createSpy("timerCallback");
		jasmine.clock().install();
	});

	afterEach(function() {
		jasmine.clock().uninstall();
	});
  
	it("should define object JKY"					, function() {expect(JKY			).toBeDefined();});
	it("should define object JKY.AJAX_APP"			, function() {expect(JKY.AJAX_APP	).toBeDefined();});
	it("should define object JKY.AJAX_URL"			, function() {expect(JKY.AJAX_URL	).toBeDefined();});
/*
	describe("test JKY.fix_flag", function() {
		it("empty should return empty"				, function() {expect(JKY.fix_flag(					)).toEqual('&nbsp;'	 );});
		it("null should return empty"				, function() {expect(JKY.fix_flag(null				)).toEqual('&nbsp;'	 );});
		it("'t' should return true"					, function() {expect(JKY.fix_flag('t', true, false	)).toBeTruthy		();});
		it("'f' should return false"				, function() {expect(JKY.fix_flag('f', true, false	)).toBeFalsy		();});
		it("'t' should return Yes"					, function() {expect(JKY.fix_flag('t', 'Yes', 'No'	)).toEqual('Yes'	 );});
		it("'f' should return No"					, function() {expect(JKY.fix_flag('f', 'Yes', 'No'	)).toEqual('No'		 );});
		it("'x' should return Any"					, function() {expect(JKY.fix_flag('x', 'Yes', 'Any'	)).toEqual('Any'	 );});
	});

	describe("test JKY.fix_br", function() {
		it("empty should return empty"				, function() {expect(JKY.fix_br(					)).toEqual('&nbsp;'	 );});
		it("null should return empty"				, function() {expect(JKY.fix_br(null				)).toEqual('&nbsp;'	 );});
		it("number should return number"			, function() {expect(JKY.fix_br(1234567890			)).toEqual(1234567890);});
		it("no space should return original"		, function() {expect(JKY.fix_br('word1word2'		)).toEqual('word1word2');});
		it("space should return <br />"				, function() {expect(JKY.fix_br('word1 word2'		)).toEqual('word1<br />word2');});
	});

	describe("test JKY.fix_date", function() {
		it("empty should return empty"				, function() {expect(JKY.fix_date(						)).toEqual('&nbsp;'	 );});
		it("null should return empty"				, function() {expect(JKY.fix_date(null					)).toEqual('&nbsp;'	 );});
		it("date should return date"				, function() {expect(JKY.fix_date('01-12-2014'			)).toEqual('01-12-2014');});
		it("' @ ' should return <br >"				, function() {expect(JKY.fix_date('01-12-2014 @ 12:35'	)).toEqual('01-12-2014<br />12:35');});
		it("' @'  should be drop out"				, function() {expect(JKY.fix_date('01-12-2014 @12:35'	)).toEqual('01-12-2014 12:35');});
	});

	describe("test JKY.fix_name", function() {
		it("no name should return empty"			, function() {expect(JKY.fix_name('tr ', null, null		)).toEqual('&nbsp;'	);});
		it("no first should return empty"			, function() {expect(JKY.fix_name('tr ', null, 'last'	)).toEqual('&nbsp;'	);});
		it("no last should return empty"			, function() {expect(JKY.fix_name('tr ', 'first', null	)).toEqual('&nbsp;'	);});
		it("first last should return with trailer"	, function() {expect(JKY.fix_name('tr ', 'first', 'last')).toEqual('tr last, first');});
	});

	describe("test JKY.fix_null", function() {
		it("empty should return empty"					, function() {expect(JKY.fix_null(					)).toEqual(''	);});
		it("null should return empty"					, function() {expect(JKY.fix_null(null				)).toEqual(''	);});
		it("'null' should return empty"			    	, function() {expect(JKY.fix_null('null'			)).toEqual(''	);});
		it("string should return original"		    	, function() {expect(JKY.fix_null('string'			)).toEqual('string');});
	});

    describe("test JKY.ymd2dmy", function() {
        it("empty should return empty"					, function() {expect(JKY.fix_ymd2dmy(					)).toEqual(''	);});
        it("empty should return empty"				    , function() {expect(JKY.fix_ymd2dmy('    '             )).toEqual(''   );});
        it("null should return empty"					, function() {expect(JKY.fix_ymd2dmy(null				)).toEqual(''	);});
        it("'null' should return empty"				    , function() {expect(JKY.fix_ymd2dmy('null'			    )).toEqual(''	);});
        it("yyyy-mm-dd should return dd-mm-yyyy"	    , function() {expect(JKY.fix_ymd2dmy('2011-07-17' 	    )).toEqual('17-07-2011');});
    });

	describe("test JKY.fix_dmy2ymd", function() {
        it("empty should return empty"				, function() {expect(JKY.fix_dmy2ymd(					)).toEqual(''	);});
        it("empty should return empty"				, function() {expect(JKY.fix_dmy2ymd('      '           )).toEqual(''   );});
		it("null should return empty"				, function() {expect(JKY.fix_dmy2ymd(null				)).toEqual(''   );});
		it("'null' should return empty"				, function() {expect(JKY.fix_dmy2ymd('null'		    	)).toEqual(''   );});
		it("dd-mm-yyyy should return yyyy-mm-dd"	, function() {expect(JKY.fix_dmy2ymd('17-07-2011'		)).toEqual('2011-07-17');});
	});
 */
    describe("test JKY.out_float", function(){
        it("null should return empty"					, function() {expect(JKY.out_float(null  			)).toEqual(''	);});
        it("12 should return 12", function() {expect(JKY.out_float('12')).toEqual(12);});
        it("12.00 should return 12.00"		, function() {expect(JKY.out_float('12.00')).toEqual(12.00);});
        it("12.34 should return 12.34"		, function() {expect(JKY.out_float(12.34)).toEqual(12.34);});
        it("12 13 14 should return 12"		, function() {expect(JKY.out_float('12 13 14')).toEqual(12);});
        it(" 12  should return 12"		    , function() {expect(JKY.out_float(' 12 ')).toEqual(12);});
        it("12 years should return 12"		, function() {expect(JKY.out_float('12 years')).toEqual(12);});
        it("He was 12 should return Nan"	, function() {expect(JKY.out_float('He was 12')).toEqual(NaN);});
    });

    describe("test JKY.out_date", function() {
        JKY.Session.set_locale('en_US');
		it("null should return empty", function() {
			expect(JKY.out_date(null)).toEqual('');
		});
		it("yyyy-mm-dd hh:mm:ss should return mm-dd-yyyy locale is " + JKY.Session.get_locale() + JKY.out_date('2014-07-17 12:34:56'), function() {
			expect(JKY.out_date('2014-07-17 12:34:56')).toEqual('07-17-2014');
		});
    });


    describe("test JKY.out_date", function() {
        JKY.Session.set_locale('pt_BR');
		it("null should return empty", function() {
			expect(JKY.out_date(null)).toEqual('');
		});
        it("yyyy-mm-dd hh:mm:ss should return dd-mm-yyyy locale is " + JKY.Session.get_locale() + JKY.out_date('2014-07-17 12:34:56'), function() {
			expect(JKY.out_date('2014-07-17 12:34:56')).toEqual('17-07-2014');
		});
    });


/*
	describe("when song has been paused", function() {
		beforeEach(function() {
			player.play(song);
			player.pause();
		});

		it("should indicate that the song is currently paused", function() {
			expect(player.isPlaying).toBeFalsy();

//			demonstrates use of 'not' with a custom matcher
			expect(player).not.toBePlaying(song);
		});

		it("should be possible to resume", function() {
			player.resume();
			expect(player.isPlaying).toBeTruthy();
			expect(player.currentlyPlayingSong).toEqual(song);
		});
	});

//	demonstrates use of spies to intercept and test method calls
	it("tells the current song if the user has made it a favorite", function() {
		spyOn(song, 'persistFavoriteStatus');

		player.play(song);
		player.makeFavorite();

		expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
	});

//	demonstrates use of expected exceptions
	describe("#resume", function() {
		it("should throw an exception if song is already playing", function() {
			player.play(song);

			expect(function() {
				player.resume();
			}).toThrowError("song is already playing");
		});
	});
*/
});