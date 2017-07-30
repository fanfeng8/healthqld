var margin = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
    },
    width = 550 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;


var origin = [152.037847, -26.908179];
var scale = '17770';
var projection = d3.geoAzimuthalEquidistant().translate([0, 0]).scale(scale).rotate([-origin[0], 0]).center([0, origin[1]]);


var path = d3.geo.path().projection(projection);

var color = d3.scale.quantize()
    .range(["rgb(161,217,155)", "rgb(116,196,118)",
            "rgb(65,171,93)", "rgb(35,139,69)",
            "rgb(0,90,50)"]);


var tooltip = d3.select(".hidden-content").append("div")
    .attr("class", "tooltip")


var svg = d3.select(".hidden-content").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.right + ")");

// Load Data
d3.csv("data/ipswich/Queesland_color.csv", function (data) {
    color.domain([
		d3.min(data, function (d) {
            return d.value;
        }),
		d3.max(data, function (d) {
            return d.value;
        })
	]);

    // Load GeoJSON Data
    d3.json("data/ipswich/Queesland.json", function (json) {
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

        var marks = [{
                "name": "ESK HOSPITAL",
                "lat": -27.23946,
                "long": 152.4183
            },
            {
                "name": "GATTON HOSPITAL",
                "lat": -27.566814,
                "long": 152.276098
            },
            {
                "name": "LAIDLEY HOSPITAL",
                "lat": -27.632641,
                "long": 152.400065
            },
            {
                "name": "IPSWICH HOSPITAL",
                "lat": -27.619517,
                "long": 152.757658
            },
            {
                "name": "BOONAH HOSPITAL",
                "lat": -27.998451,
                "long": 152.678127
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
            })

        var Smiles = [{
            "name": 1,
            "lat": -27.959318,
            "long": 153.286366
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
            "lat": -27.897760,
            "long": 152.153408
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
