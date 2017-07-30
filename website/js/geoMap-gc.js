function DrawGoldcoast(div_id,tooltip_id){
var margin = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 100
    },
    width = 550 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;


var origin = [153.026030, -27.662315];
var scale = '34460';
var projection = d3.geoAzimuthalEquidistant().translate([0, 0]).scale(scale).rotate([-origin[0], 0]).center([0, origin[1]]);


var path = d3.geo.path().projection(projection);

var color = d3.scale.quantize()
    .range(["rgb(168,29,77)", "rgb(238,95,155)",
            "rgb(241,141,181)", "rgb(148,222,226)",
            "rgb(68,146,147)"]);

d3.select(tooltip_id).selectAll("*").remove();
var tooltip = d3.select(tooltip_id).append("div")
    .attr("class", "tooltip")

d3.select(div_id).selectAll("*").remove();
var svg = d3.select(div_id).append("svg")
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
                "name": "<blockquote class='twitter-tweet' data-lang='en'><p lang='en' dir='ltr'>Hospital dinner. Pretty tasty actually. @ Pindara Private Hospital <a href='https://t.co/ART4FLz9QT'>https://t.co/ART4FLz9QT</a></p>&mdash; Jennifer Doherty (@Ilaeria) <a href='https://twitter.com/Ilaeria/status/719785433291358208'>April 12, 2016</a></blockquote><script async src='//platform.twitter.com/widgets.js' charset='utf-8'></script>",
				"lat": -28.00895,
                "long": 153.39456
            },
            {
                "name": "<blockquote class='twitter-tweet' data-lang='en'><p lang='en' dir='ltr'>Escaped from hospital last night to spend time with my fav people igersgoldcoast and have a good?<a href='https://t.co/MZD6gQVkVC'>https://t.co/MZD6gQVkVC</a></p>&mdash; Katiemuz (@katielou2050) <a href='https://twitter.com/katielou2050/status/724010021823078400'>April 23, 2016</a></blockquote><script async src='//platform.twitter.com/widgets.js' charset='utf-8'></script>",
                "lat": -28.07241988,
                "long": 153.4269536
            },
			{
                "name": "<blockquote class='twitter-tweet' data-lang='en'><p lang='en' dir='ltr'>Leaving the hospital (@ Redlands Hospital in Cleveland, QLD) <a href='https://t.co/FY1nDlJLxU'>https://t.co/FY1nDlJLxU</a></p>&mdash; vanessa_pr (@vanessa_pr) <a href='https://twitter.com/vanessa_pr/status/707917948078432256'>March 10, 2016</a></blockquote><script async src='//platform.twitter.com/widgets.js' charset='utf-8'></script>",
                "lat": -27.54050185,
                "long": 153.2514801
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
                "name": "<blockquote class='twitter-tweet' data-lang='en'><p lang='en' dir='ltr'>Too often we get this in the clinic. Chronic movement dysfunction are habits.<br><br>I&#39;m sorry but?<a href='https://t.co/mtrbln1nZB'>https://t.co/mtrbln1nZB</a></p>&mdash; Jono Freeman (@jono_freeman) <a href='https://twitter.com/jono_freeman/status/707301620804149250'>March 8, 2016</a></blockquote><script async src='//platform.twitter.com/widgets.js' charset='utf-8'></script>",
                "lat": -28.014927,
                "long": 153.359300
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