function Table(the_table_name) {
	var my_table_name = the_table_name;
	var my_database   = 'erp'; 
	
	var DataBase = require('mariasql');
	var database = new DataBase();

	database.connect(
		{ host: '127.0.0.1'
		, user: 'root'
		, password: 'gundam8942'
//		, multiStatements: true
	});

	database.on('connect'	, function()		{ console.log('DataBase connected'		); })
			.on('close'		, function()		{ console.log('DataBase closed'			); })
			.on('error'		, function(error)	{ console.log('DataBase error: ' + error); })
			;
	database.query('USE ' + my_database);

	this.get_table_name = function()			{ return my_table_name; }
	
	this.get_row = function(the_error, the_where, the_success) {
		var my_sql	= 'SELECT *'
					+ '  FROM ' + this.get_table_name()
					+ ' WHERE ' + the_where
					+ ';';
		database.query(my_sql, false)
				.on('result', function(result) {
					result.on('row', function(the_row)	{ the_success(the_row); })
				});
	};

	this.get_rows = function(the_error, the_where, the_success) {
		var my_rows = [];
		var my_sql	= 'SELECT *'
					+ '  FROM ' + this.get_table_name()
					+ ' WHERE ' + the_where
					+ ';';
		database.query(my_sql, false)
				.on('result', function(result) {
					result.on('row', function(the_row)	{ my_rows.push(the_row); })
					result.on('end', function() 		{ the_success (my_rows); })
				});
	};

	this.insert = function(the_error, the_set, the_success) {
		var my_sql	= 'INSERT ' + this.get_table_name()
					+ '   SET ' + the_set
					+ ';';
		database.query(my_sql, false)
				.on('result', function(result) {
					result.on('end', function() 		{ the_success('200'); })
				});
	};

	this.update = function(the_error, the_set, the_where, the_success) {
		var my_sql	= 'UPDATE ' + this.get_table_name()
					+ '   SET ' + the_set
					+ ' WHERE ' + the_where
					+ ';';
		database.query(my_sql, false)
				.on('result', function(result) {
					result.on('end', function() 		{ the_success('200'); })
				});
	};

	this.delete = function(the_error, the_where, the_success) {
		var my_sql	= 'DELETE '
					+ '  FROM ' + this.get_table_name()
					+ ' WHERE ' + the_where
					+ ';';
		database.query(my_sql, false)
				.on('result', function(result) {
					result.on('end', function() 		{ the_success('200'); })
				});
	};

};

module.exports = Table;
