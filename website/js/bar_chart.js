var margin = { top: 20, right: 20, bottom: 100, left: 40 },
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#main-map").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//define the x,y scale
var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.2, 0.2);

var yScale = d3.scale.linear()
    .range([height, 0]);

//define axis	
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

	//Import data	
	d3.csv("customer-satisfaction-bus.csv", function(error, data){
		if (error) console.log("Error: data not loaded" + error);
		data.forEach(function(d){
			d.Satisfactory_score = +d.Satisfactory_score;
			d.Categories = d.Categories;
			console.log(d.Satisfactory_score);
		});

	//Sort data from high to low
	data.sort(function(a,b){
		return b.Satisfactory_score - a.Satisfactory_score;
		});

	//Specify the domains of the x and y scales
	xScale.domain(data.map(function(d){ return d.Categories; }) );
	yScale.domain([0, d3.max(data, function(d){ return d.Satisfactory_score; }) ] );

	//Draw the bars
	svg.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('height', 0)
		.attr('y', height)
		.transition().duration(3000)
		.delay(function(d,i) { return i * 200;})
		.attr({
			'x':function(d) { return xScale(d.Categories); },
			'y':function(d) { return yScale(d.Satisfactory_score); },
			'width': xScale.rangeBand(),
			'height': function(d) { return height - yScale(d.Satisfactory_score); }
		})
		.style('fill', function(d,i) { return 'rgb(109, 160,' + ((i * 10) + 100) + ')' });  //Color
		
		// Lable the bars
		svg.selectAll('text')
			.data(data)
			.enter()
			.append('text')
			.text(function(d) { return d.Satisfactory_score; })
			.attr('x', function(d) { return xScale(d.Categories) + xScale.rangeBand()/2; })
			.attr('y', function(d) { return yScale(d.Satisfactory_score) + 20; })
			.style('fill', 'white')
			.style('text-anchor', 'middle');
		
		// Draw the xAxis
		svg.append('g')
			.attr('class', 'x axis')
			.attr('transform', "translate(0," + height + ")" )
			.call(xAxis)
			.selectAll('text')
			.attr('transform', 'rotate(-30)')
			.attr('dx', '-.8em')
			.attr('dy', '.25em')
			.style('text-anchor', 'end')
			.style('font-size', '13px');
			
		svg.append('g')
			.attr('class', 'y axis')
			.call(yAxis)
			.style('font-size', '13px');
	
	
});

















