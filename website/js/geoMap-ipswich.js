function DrawIpswich(div_id,tooltip_id){
var margin = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 100
    },
    width = 550 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;


var origin = [152.037847, -26.908179];
var scale = '17770';
var projection = d3.geoAzimuthalEquidistant().translate([0, 0]).scale(scale).rotate([-origin[0], 0]).center([0, origin[1]]);


var path = d3.geo.path().projection(projection);

var color = d3.scale.quantize()
    .range(["rgb(168,29,77)", "rgb(238,95,155)",
            "rgb(241,141,181)", "rgb(148,222,226)",
            "rgb(68,146,147)"]);


var tooltip = d3.select(tooltip_id).append("div")
    .attr("class", "tooltip")


d3.select(div_id).selectAll("*").remove();
var svg = d3.select(div_id).append("svg")
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
            "name": "...",
            "lat": -27.620925, 
            "long": 152.431307
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
            "name": "<blockquote class=’twitter-tweet’ data-lang=’en’><p lang=’en’ dir=’ltr’>We have been in the hospital since 4pm yesterday and it&#39;s a long and painful process but… < a href=’’>https://t.co/tgTHByWq63</a></p>&mdash; Nathan Walker (@saturday_13) < a href=’https://twitter.com/saturday_13/status/882556599910359042’>July 5, 2017</ a></blockquote> <script async src=’//platform.twitter.com/widgets.js’ charset=’utf-8’></script>",
            "lat":-27.619267 , 
            "long":152.758842
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
}