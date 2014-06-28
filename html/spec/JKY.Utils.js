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
		it("empty should return ''"					, function() {expect(JKY.fix_null(					)).toEqual(''	);});
		it("null should return ''"					, function() {expect(JKY.fix_null(null				)).toEqual(''	);});
		it("'null' should return ''"				, function() {expect(JKY.fix_null('null'			)).toEqual(''	);});
		it("string should return original"			, function() {expect(JKY.fix_null('string'			)).toEqual('string');});
	});

	describe("test JKY.fix_null", function() {
		it("empty should return ''"					, function() {expect(JKY.fix_null(					)).toEqual(''	);});
		it("null should return ''"					, function() {expect(JKY.fix_null(null				)).toEqual(''	);});
		it("'null' should return ''"				, function() {expect(JKY.fix_null('null'			)).toEqual(''	);});
		it("string should return original"			, function() {expect(JKY.fix_null('string'			)).toEqual('string');});
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
