function tickets() {
	display('tickets');

	var express = require('express');
	var app = express();
	app   .get_tickets	= function(request, response, callback)		{ tickets.prototype.gets	(request, response, callback) };
	app   .get_ticket	= function(request, response, callback)		{ tickets.prototype.get		(request, response, callback) };
	app   .put_ticket	= function(request, response, callback)		{ tickets.prototype.put		(request, response, callback) };
	app  .post_ticket	= function(request, response, callback)		{ tickets.prototype.post	(request, response, callback) };
	app.delete_ticket	= function(request, response, callback)		{ tickets.prototype.delete	(request, response, callback) };
}
tickets.prototype = new Table('Tickets');

module.exports = tickets;
