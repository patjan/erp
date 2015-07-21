/*
 *	generic parent Table class
 *
 *	example:
 *		var controls = new Table('Controls');
 */

function Table(the_table_name) {
	var my_table_name	= the_table_name;

	var my_table_host	= '127.0.0.1';
	var my_table_user	= 'root';
	var my_password		= 'gundam8942';
	var my_database		= 'erp';

//	----------------------------------------------------------------------------
	var winston = require('winston');
	var logger = new (winston.Logger)({
		transports:
			[ new (winston.transports.Console)()
			, new (winston.transports.File)({ filename: 'somefile.log' })
			]
	});

//	----------------------------------------------------------------------------
	var DataBase = require('mariasql');
	var database = new DataBase();
	database.connect(
		{ host		: my_table_host
		, user		: my_table_user
		, password	: my_password
//		, multiStatements: true
	});

	database.on('connect'	, function()		{ console.log('DataBase connected'		)})
			.on('close'		, function()		{ console.log('DataBase closed'			)})
			.on('error'		, function(error)	{ console.log('DataBase error: ' + error)})
			;
	database.query('USE ' + my_database);

//	----------------------------------------------------------------------------
	this.get_table_name = function()			{ return my_table_name; }
	
//	----------------------------------------------------------------------------
	/*
	 *	select one or more rows from specific table
	 */
	this.get_rows = function(the_where, the_callback) {
		var my_rows = [];
		var my_sql	= 'SELECT *'
					+ '  FROM ' + this.get_table_name() + this.get_table_joins()
					+ ' WHERE ' + the_where
					+ ';';
		logger.info(my_sql);
		database.query(my_sql, false)
				.on('result', function(result) {
					result.on('row', function(the_row)	{ my_rows.push(the_row)})
					result.on('end', function() 		{ the_callback(my_rows)})
				});
	};

//	----------------------------------------------------------------------------
	/*
	 *	select one row from specific table
	 */
	this.get_row = function(the_where, the_callback) {
		var my_sql	= 'SELECT *'
					+ '  FROM ' + this.get_table_name()
					+ ' WHERE ' + the_where
					+ ';';
		logger.info(my_sql);
		database.query(my_sql, false)
				.on('result', function(result) {
					result.on('row', function(the_row)	{ the_callback(the_row)})
				});
	};

	/*
	 *	insert one row into specific table
	 */
	this.insert = function(the_set, the_callback) {
		var my_sql	= 'INSERT ' + this.get_table_name()
					+ '   SET ' + the_set
					+ ';';
		logger.info(my_sql);
		database.query(my_sql, false)
				.on('result', function(result) {
					result.on('end', function() 		{ the_callback('200')})
				});
	};

	/*
	 *	update one row into specific table
	 */
	this.update = function(the_set, the_where, the_callback) {
		var my_sql	= 'UPDATE ' + this.get_table_name()
					+ '   SET ' + the_set
					+ ' WHERE ' + the_where
					+ ';';
		logger.info(my_sql);
		database.query(my_sql, false)
				.on('result', function(result) {
					result.on('end', function() 		{ the_callback('200'); })
				});
	};

	/*
	 *	delete one row from specific table
	 */
	this.delete = function(the_where, the_callback) {
		var my_sql	= 'DELETE '
					+ '  FROM ' + this.get_table_name()
					+ ' WHERE ' + the_where
					+ ';';
		logger.info(my_sql);
		database.query(my_sql, false)
				.on('result', function(result) {
					result.on('end', function() 		{ the_callback('200'); })
				});
	};

};

module.exports = Table;
