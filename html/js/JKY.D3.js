"use strict";
var JKY = JKY || {};
/**
 * JKY.D3 - process all D3 graphic functions
 *
 * require:	d3js.js
 */
JKY.D3 = function() {
	var my_args		= null;

	var axis_height	=  30;
	var bar_height	=  20;
	var space		=   2;
	var second_bar	=		bar_height + space;
	var row_height	=   2 * bar_height + space * 5;
	var left_width	=  80;
	var right_width	=  80;
	var ticks		=  10;

/**
 * process sets and gets
 */
	function my_setArgs(the_args) {
		JKY.display_trace('my_setArgs');
		my_args = the_args;
	};

	function my_getArgs() {
		JKY.display_trace('my_getArgs');
		return my_args;
	};

	function my_set(the_arg, the_value) {
		JKY.display_trace('my_set');
		my_args[the_arg] = the_value;
	};

	function my_get(the_arg) {
		JKY.display_trace('my_get');
		return my_args[the_arg];
	};

	function my_init() {
		JKY.display_trace('my_init');
	};

/**
 *	draw the chart
 */
	function my_draw(the_data) {
		JKY.display_trace('my_draw');

		var my_html = '';
		if (my_args.graph_name == 'dual_bar')		{my_dual_bar(the_data);}
		if (my_args.graph_name == 'donut'	)		{my_donut	(the_data);}

		return my_html;
	};

/**
 *	draw dual bar
 */
	function my_dual_bar(the_data) {
		JKY.display_trace('my_dual_bar');

//		calculate the height based on number of json rows
		var chart_width		= my_args.chart_width;
		var chart_height	= the_data.length * row_height;

//		set the highest value and round up
		var my_highest = 100;
		for (var i=0, max=the_data.length; i<max; i++) {
			var my_var1 = parseInt(the_data[i][my_args.var1_name]);
			var my_var2 = parseInt(the_data[i][my_args.var2_name]);
			if (my_highest < my_var1)	my_highest = my_var1;
			if (my_highest < my_var2)	my_highest = my_var2;
		}
		var my_round_up = (my_args.round_up ? my_args.round_up : 100);
		my_highest = Math.ceil(my_highest / my_round_up) * my_round_up;

//		calculate width based on linear scale of value given
		var width_scale = d3.scale.linear()
			.domain	([0, my_highest])
			.range	([0, chart_width])
			;

//		calculate the vertical row position
		var row_position = function(i) {
			return i * row_height;
		};

//		define svg dimension and bind to graph id
		var svg = d3.select('#' + my_args.id_name)
			.append("svg")
			.attr("width" , chart_width  + left_width + right_width)
			.attr("height", chart_height + 2 * axis_height)
			;
//		display the yAxis value at middle of first and second bar
		svg.selectAll("text.name")
			.data(the_data)
			.enter().append("text")
			.attr("x"		, 0)
			.attr("y"		, function(d, i)	{return row_position(i);})
			.attr("dx"		, 0)
			.attr("dy"		, axis_height + bar_height + 8)
			.attr("class"	, my_args.axis_name)
			.attr("text-anchor", "begin")
			.text(function(d, i)	{return d[my_args.axis_name];})
			;
//		define chart position
		var chart = svg.append("g")
			.attr("transform", "translate(" + left_width + "," + (axis_height + space)+ ")")
			;
//		display top axis
		var xAxisTop = d3.svg.axis()
			.scale(width_scale)
			.orient("top")
			.ticks(ticks, "")
			;
		svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(" + left_width + ", " + axis_height + ")")
			.call(xAxisTop)
			;
//		display bottom axis
		var xAxisBottom = d3.svg.axis()
			.scale(width_scale)
			.orient("bottom")
			.ticks(ticks, "")
			;
		svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(" + left_width + ", " + (axis_height + chart_height - space) + ")")
			.call(xAxisBottom)
			;
//		display first bar
		chart.selectAll(".bar")
			.data(the_data)
			.enter().append("rect")
			.attr("class"	, my_args.var1_name)
			.attr("x"		, 0)
			.attr("y"		, function(d, i)	{return row_position(i);})
			.attr("width"	, function(d, i)	{return width_scale(d[my_args.var1_name]);})
			.attr("height"	, bar_height)
			;
//		display second bar
		chart.selectAll(".bar")
			.data(the_data)
			.enter().append("rect")
			.attr("class"	, my_args.var2_name)
			.attr("x"		, 0)
			.attr("y"		, function(d, i)	{return row_position(i) + second_bar;})
			.attr("width"	, function(d, i)	{return width_scale(d[my_args.var2_name]);})
			.attr("height"	, bar_height)
			;
//		display vertical white divider every 10%
		chart.selectAll("line.x")
			.data(width_scale.ticks(ticks))
			.enter().append("line")
			.attr("y1"		, 0)
			.attr("y2"		, chart_height)
			.attr("x1"		, width_scale)
			.attr("x2"		, width_scale)
			.attr("class"	, "divider")
			;
//		display the value at end of first bar
		chart.selectAll("text.name")
			.data(the_data)
			.enter().append("text")
			.attr("x"		, function(d, i)	{return width_scale(d[my_args.var1_name]);})
			.attr("y"		, function(d, i)	{return row_position(i);})
			.attr("dx"		, -5)
			.attr("dy"		, 15)
			.attr("class"	, "insider")
			.attr("text-anchor", "end")
			.text(function (d, i)	 {return parseInt(d[my_args.var1_name]);})
			;
//		display the value at end of second bar
		chart.selectAll("text.name")
			.data(the_data)
			.enter().append("text")
			.attr("x"		, function(d, i)	{return width_scale(d[my_args.var2_name]);})
			.attr("y"		, function(d, i)	{return row_position(i) + second_bar;})
			.attr("dx"		, -5)
			.attr("dy"		, 15)
			.attr("class"	, "insider")
			.attr("text-anchor", "end")
			.text(function (d, i)	 {return parseInt(d[my_args.var2_name]);})
			;
    };

/**
 *	draw donut
 */
	function my_donut(the_data) {
		JKY.display_trace('my_dual_bar');

    var radius = Math.min(my_args.chart_width, my_args.chart_height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius *.6);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d[my_args.var1_name]; });

    var svg = d3.select('#' + my_args.id_name)
        .append("svg")
        .attr("width", my_args.chart_width)
        .attr("height", my_args.chart_height)
        .append("g")
        .attr("transform", "translate(" + my_args.chart_width / 2 + "," + my_args.chart_height / 2 + ")");

        the_data.forEach(function(d) {
            d[my_args.var1_name] = +d[my_args.var1_name];
        });

        var g = svg.selectAll(".arc")
            .data(pie(the_data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d,i) { return color(i); });

        g.append("text")
            .attr("transform", function(d,i) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(function(d) { return d[my_args.axis_name]; });

	};



return {version	:	'1.0.0'
		, setArgs	:	function(the_args)				{		my_setArgs(the_args)		;}
		, getArgs	:	function()						{		my_getArgs()				;}
		, set		:	function(the_arg, the_value)	{return my_set(the_arg, the_value)	;}
		, get		:	function(the_arg)				{return my_get(the_arg)				;}
		, init		:	function()						{		my_init()					;}

		, draw		:	function(the_data)				{return	my_draw(the_data)			;}
	};
}();
