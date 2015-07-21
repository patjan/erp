/*
 *	Table controls
 */

var express = require('express');
var Table = require('./../server/Table.js');

var app_controls = express();

var controls = new Table();

var my_table_name: 'Controls';

var get_where = function(the_select, the_filter) {
	var my_sql = ''
		+ 'SELECT *'
		+ '  FROM ' + my_table_name()
		+ ' WHERE ' + the_where
		+ ';';
	return my_sql;
};

var get_sql = function(the_where) {
	var my_sql = ''
		+ 'SELECT *'
		+ '  FROM ' + my_table_name()
		+ ' WHERE ' + the_where
		+ ';';
	return my_sql;
};

app_controls.get_rows = function(request, response) {
	var my_select = request.query.select;
	var my_filter = request.query.filter;
	controls.get_rows(null, get_where(my_select, my_filter), function(the_rows) {
		response.json(the_rows);
	});
};

app_controls.get_row = function(request, response) {
	var my_where = 'id = ' + request.query.id;
	controls.get_row(null, get_select(my_where), function(the_row) {
		response.json(the_row);
	});
};

app_controls.insert = function(request, response) {
	var my_set = ''
		+ '     status = "' + request.body.status		+ '"'
		+ ',  sequence =  ' + request.body.sequence
		+ ',      name = "' + request.body.name			+ '"'
		+ ',     value = "' + request.body.value		+ '"'

		+ ', group_set = "' + request.body.group_set	+ '"'
		;
	controls.insert(null, my_set, function(the_return_code) {
		response.send(the_return_code);
	});
};
		
app_controls.update = function(request, response) {
	var my_set = ''
		+ '     status = "' + request.body.status		+ '"'
		+ ',  sequence =  ' + request.body.sequence
		+ ',      name = "' + request.body.name			+ '"'
		+ ',     value = "' + request.body.value		+ '"'
		;
	var my_where = 'id = ' + request.body.id;
	controls.update(null, my_set, my_where, function(the_return_code) {
		response.send(the_return_code);
	});
};

app_controls.delete = function(request, response) {
	var my_where = 'id = ' + request.query.id;
	controls.delete(null, my_where, function(the_return_code) {
		response.send(the_return_code);
	});
};

module.exports = app_controls;
