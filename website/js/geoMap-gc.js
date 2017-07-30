var margin = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
    },
    width = 550 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;


var origin = [153.026030, -27.662315];
var scale = '34460';
var projection = d3.geoAzimuthalEquidistant().translate([0, 0]).scale(scale).rotate([-origin[0], 0]).center([0, origin[1]]);


var path = d3.geo.path().projection(projection);

var color = d3.scale.quantize()
    .range(["rgb(161,217,155)", "rgb(116,196,118)",
            "rgb(65,171,93)", "rgb(35,139,69)",
            "rgb(0,90,50)"]);


var tooltip = d3.select("#main-map").append("div")
    .attr("class", "tooltip")


var svg = d3.select("#main-map").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.right + ")");

// Load Data
d3.csv("data/gc/Queesland_color.csv", function (data) {
    color.domain([
		d3.min(data, function (d) {
            return d.value;
        }),
		d3.max(data, function (d) {
            return d.value;
        })
	]);

    // Load GeoJSON Data
    d3.json("data/gc/Queesland.json", function (json) {
        for (var i = 0; i < data.length; i++) {
            var dataState = data[i].state;
            var dataValue = parseFloat(data[i].value);
            for (var j = 0; j < json.features.length; j++) {
                var jsonState = json.features[j].properties.name;
                if (dataState == jsonState) {
                    json.features[j].properties.value = dataValue;
                    break;
                }
            }
        }

        // Bind Data 
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("class", "state-boundary")
            .attr("d", path)
            .style("fill", function (d) {
                return color(d.properties.value);
            })
            .on("mouseover", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html("<strong>" + d.properties.name + "</strong>")
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("color", 'gray')
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            })

        //Marks
        var marks = [{
                "name": "GOLD COAST HOSPITAL",
                "lat": -27.970344,
                "long": 153.408973
            },
            {
                "name": "GOLD COAST HOSPITAL BIRTHING CENTRE",
                "lat": -27.970344,
                "long": 153.408973
            },
            {
                "name": "ROBINA HOSPITAL",
                "lat": -28.071046,
                "long": 153.375704
            }]

        svg.selectAll(".mark")
            .data(marks)
            .enter()
            .append("image")
            .attr('class', 'mark')
            .attr('width', 12)
            .attr('height', 12)
            .attr("xlink:href", 'https://cdn0.iconfinder.com/data/icons/fire/106/cross_1-128.png')
            .attr("transform", function (d) {
                return "translate(" + projection([d.long, d.lat]) + ")";
            })
            .on("mouseover", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html("<strong>" + d.name + "</strong>")
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")
                    .style("color", 'red');
            })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        //Smile
        var Smiles = [{
                "name": 1,
                "lat": -27.959318,
                "long": 153.286366
            },
            {
                "name": 1,
                "lat": -28.035407,
                "long": 153.323101
            }]

        svg.selectAll(".smile")
            .data(Smiles)
            .enter()
            .append("image")
            .attr('class', 'smile')
            .attr('width', 16)
            .attr('height', 16)
            .attr("xlink:href", 'https://cdn1.iconfinder.com/data/icons/emoticons-6/100/smiley-1-512.png')
            .attr("transform", function (d) {
                return "translate(" + projection([d.long, d.lat]) + ")";
            })
            .on("mouseover", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html("<strong>" + d.name + "</strong>")
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")
                    .style("color", 'red');
            })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });



        //Angry
        var Angry = [{
                "name": 1,
                "lat": -27.977512,
                "long": 153.427471
            },
            {
                "name": 1,
                "lat": -28.063889,
                "long": 153.366360
            }]
        svg.selectAll(".angry")
            .data(Angry)
            .enter()
            .append("image")
            .attr('class', 'angry')
            .attr('width', 16)
            .attr('height', 16)
            .attr("xlink:href", 'http://hunsci.com/data/out/256/1028652.png')
            .attr("transform", function (d) {
                return "translate(" + projection([d.long, d.lat]) + ")";
            })
            .on("mouseover", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html("<strong>" + d.name + "</strong>")
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")
                    .style("color", 'red');
            })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    });


});
