var margin = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
    },
    width = 550 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;


var origin = [137.384242, -9.512884];
var scale = '1460';
var projection = d3.geoAzimuthalEquidistant().translate([0, 0]).scale(scale).rotate([-origin[0], 0]).center([0, origin[1]]);


var path = d3.geo.path().projection(projection);

var color = d3.scale.quantize()
    .range(["rgb(161,217,155)", "rgb(116,196,118)",
            "rgb(65,171,93)", "rgb(35,139,69)",
            "rgb(0,90,50)"]);


var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.right + ")");

// Load Data
d3.csv("data/qld/Queesland_color.csv", function (data) {
    color.domain([
		d3.min(data, function (d) {
            return d.value;
        }),
		d3.max(data, function (d) {
            return d.value;
        })
	]);

    // Load GeoJSON Data
    d3.json("data/qld/Queesland.json", function (json) {
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

        var marks = [
            {
                "name": "ATHERTON HOSPITAL",
                "lat": -17.267161,
                "long": 145.482231
					  },
            {
                "name": "BABINDA HOSPITAL",
                "lat": -17.342768,
                "long": 145.918884
					  },
            {
                "name": "CAIRNS BASE HOSPITAL",
                "lat": -16.91318,
                "long": 145.769905
					  },
            {
                "name": "CHILLAGOE HOSPITAL",
                "lat": -17.149983,
                "long": 144.527766
					  },
            {
                "name": "CROYDON HOSPITAL",
                "lat": -18.201721,
                "long": 142.243726
					  },
            {
                "name": "DIMBULAH OUTPATIENTS CLINIC",
                "lat": -17.1476,
                "long": 145.10823
					  },
            {
                "name": "FORSAYTH HOSPITAL",
                "lat": -18.589672,
                "long": 143.603703
					  },
            {
                "name": "GEORGETOWN HOSPITAL",
                "lat": -18.292659,
                "long": 143.547582
					  },
            {
                "name": "GORDONVALE HOSPITAL",
                "lat": -17.081438,
                "long": 145.802705
					  },
            {
                "name": "HERBERTON HOSPITAL",
                "lat": -17.380631,
                "long": 145.381212
					  },
            {
                "name": "INNISFAIL HOSPITAL",
                "lat": -17.520448,
                "long": 146.029871
					  },
            {
                "name": "MALANDA OUTPATIENTS CLINIC",
                "lat": -17.354017,
                "long": 145.596411
					  },
            {
                "name": "MAREEBA HOSPITAL",
                "lat": -16.989277,
                "long": 145.422137
					  },
            {
                "name": "MILLAA MILLAA OUTPATIENTS CLINIC",
                "lat": -17.513075,
                "long": 145.610522
					  },
            {
                "name": "MOSSMAN HOSPITAL",
                "lat": -16.463778,
                "long": 145.368741
					  },
            {
                "name": "MOUNT GARNET OUTPATIENTS CLINIC",
                "lat": -17.678514,
                "long": 145.112772
					  },
            {
                "name": "RAVENSHOE OUTPATIENTS CLINIC",
                "lat": -17.605321,
                "long": 145.481802
					  },
            {
                "name": "TULLY HOSPITAL",
                "lat": -17.935382,
                "long": 145.923017
					  },
            {
                "name": "GURRINY YEALAMUCKA PRIMARY HEALTH CARE SERVICE",
                "lat": -16.927091,
                "long": 145.892857
					  },
            {
                "name": "AURUKUN PRIMARY HEALTH CARE CENTRE",
                "lat": -16.927091,
                "long": 145.892857
					  },
            {
                "name": "COEN PRIMARY HEALTH CARE CENTRE",
                "lat": -13.945128,
                "long": 143.201418
					  },
            {
                "name": "COOKTOWN HOSPITAL",
                "lat": -15.475406,
                "long": 145.249749
					  },
            {
                "name": "HOPE VALE PRIMARY HEALTH CARE CENTRE",
                "lat": 34.083184,
                "long": -117.264593
					  },
            {
                "name": "KOWANYAMA PRIMARY HEALTH CARE CENTRE",
                "lat": -15.475974,
                "long": 141.746613
					  },
            {
                "name": "LAURA PRIMARY HEALTH CARE CENTRE",
                "lat": -15.557167,
                "long": 144.446932
					  },
            {
                "name": "LOCKHART RIVER PRIMARY HEALTH CARE CENTRE",
                "lat": -12.786626,
                "long": 143.344253
					  },
            {
                "name": "MALAKOOLA PRIMARY HEALTH CARE CENTRE",
                "lat": -12.625222,
                "long": 141.883534
					  },
            {
                "name": "MAPOON PRIMARY HEALTH CARE CENTRE",
                "lat": -12.019127,
                "long": 141.901734
					  },
            {
                "name": "PORMPURAAW PRIMARY HEALTH CARE CENTRE",
                "lat": -14.899475,
                "long": 141.620656
					  },
            {
                "name": "WEIPA HOSPITAL",
                "lat": -12.623891,
                "long": 141.88021
					  },
            {
                "name": "WUJAL WUJAL PRIMARY HEALTH CARE CENTRE",
                "lat": -15.94794,
                "long": 145.322411
					  },
            {
                "name": "BARALABA HOSPITAL",
                "lat": -24.179943,
                "long": 149.812074
					  },
            {
                "name": "BILOELA HOSPITAL",
                "lat": -24.396568,
                "long": 150.517018
					  },
            {
                "name": "BLACKWATER HOSPITAL",
                "lat": -23.576004,
                "long": 148.878269
					  },
            {
                "name": "CAPELLA OUTPATIENTS CLINIC",
                "lat": -23.080304,
                "long": 148.021918
					  },
            {
                "name": "CAPRICORN COAST HOSPITAL & HEALTH SERVICE",
                "lat": -23.144257,
                "long": 150.734647
					  },
            {
                "name": "EMERALD HOSPITAL",
                "lat": -23.516633,
                "long": 148.156527
					  },
            {
                "name": "GEMFIELDS OUTPATIENTS CLINIC",
                "lat": -23.457921,
                "long": 147.723391
					  },
            {
                "name": "GLADSTONE HOSPITAL",
                "lat": -23.852067,
                "long": 151.24609
					  },
            {
                "name": "MOUNT MORGAN HOSPITAL",
                "lat": -23.645365,
                "long": 150.389927
					  },
            {
                "name": "MOURA HOSPITAL",
                "lat": -24.576356,
                "long": 149.975256
					  },
            {
                "name": "ROCKHAMPTON BASE HOSPITAL",
                "lat": -23.384471,
                "long": 150.49959
					  },
            {
                "name": "SPRINGSURE HOSPITAL",
                "lat": -24.121493,
                "long": 148.088048
					  },
            {
                "name": "THEODORE HOSPITAL",
                "lat": -24.943932,
                "long": 150.076089
					  },
            {
                "name": "WOORABINDA HOSPITAL",
                "lat": -24.133373,
                "long": 149.455056
					  },
            {
                "name": "ALPHA HOSPITAL",
                "lat": -23.654386,
                "long": 146.634252
					  },
            {
                "name": "ARAMAC PRIMARY HEALTHCARE CENTRE",
                "lat": -22.970999,
                "long": 145.245237
					  },
            {
                "name": "BARCALDINE HOSPITAL",
                "lat": -23.55252,
                "long": 145.289561
					  },
            {
                "name": "BLACKALL HOSPITAL",
                "lat": -24.425027,
                "long": 145.466955
					  },
            {
                "name": "BOULIA PRIMARY HEALTH CENTRE",
                "lat": -22.910693,
                "long": 139.909454
					  },
            {
                "name": "ISISFORD PRIMARY HEALTH CENTRE",
                "lat": -24.258682,
                "long": 144.441002
					  },
            {
                "name": "JUNDAH PRIMARY HEALTH CENTRE",
                "lat": -24.821654,
                "long": 143.06648
					  },
            {
                "name": "LONGREACH HOSPITAL",
                "lat": -23.435008,
                "long": 144.262254
					  },
            {
                "name": "MUTTABURRA PRIMARY HEALTH CENTRE",
                "lat": -22.595432,
                "long": 144.546708
					  },
            {
                "name": "TAMBO PRIMARY HEALTH CARE CENTRE",
                "lat": -24.880475,
                "long": 146.249191
					  },
            {
                "name": "WINDORAH CLINIC",
                "lat": -25.421049,
                "long": 142.655672
					  },
            {
                "name": "WINTON HOSPITAL",
                "lat": -22.381362,
                "long": 143.04142
					  },
            {
                "name": "YARAKA CLINIC",
                "lat": -24.883482,
                "long": 144.075457
					  },
            {
                "name": "ELLEN BARRON FAMILY CENTRE",
                "lat": -27.424256,
                "long": 153.049169
					  },
            {
                "name": "ROYAL CHILDREN'S HOSPITAL",
                "lat": -27.448523,
                "long": 153.018527
					  },
            {
                "name": "CHERBOURG HOSPITAL",
                "lat": -26.292628,
                "long": 151.955447
					  },
            {
                "name": "CHINCHILLA HOSPITAL",
                "lat": -26.744822,
                "long": 150.6396
					  },
            {
                "name": "DALBY HOSPITAL",
                "lat": -27.183026,
                "long": 151.260567
					  },
            {
                "name": "GOONDIWINDI HOSPITAL",
                "lat": -28.548111,
                "long": 150.306151
					  },
            {
                "name": "INGLEWOOD HOSPITAL",
                "lat": -28.423321,
                "long": 151.045549
					  },
            {
                "name": "JANDOWAE HOSPITAL",
                "lat": -26.781313,
                "long": 151.105903
					  },
            {
                "name": "KINGAROY HOSPITAL",
                "lat": -26.532158,
                "long": 151.838765
					  },
            {
                "name": "MEANDARRA OUTPATIENTS CLINIC",
                "lat": -27.326693,
                "long": 149.88133
					  },
            {
                "name": "MILES HOSPITAL",
                "lat": -26.658327,
                "long": 150.187057
					  },
            {
                "name": "MILLMERRAN HOSPITAL",
                "lat": -27.879557,
                "long": 151.262774
					  },
            {
                "name": "MOONIE OUTPATIENTS CLINIC",
                "lat": -27.695876,
                "long": 150.387635
					  },
            {
                "name": "MURGON HOSPITAL",
                "lat": -26.238104,
                "long": 151.947495
					  },
            {
                "name": "NANANGO HOSPITAL",
                "lat": -26.666181,
                "long": 152.007773
					  },
            {
                "name": "OAKEY HOSPITAL",
                "lat": -27.425172,
                "long": 151.720535
					  },
            {
                "name": "STANTHORPE HOSPITAL",
                "lat": -28.661024,
                "long": 151.929572
					  },
            {
                "name": "TAROOM HOSPITAL",
                "lat": -25.639345,
                "long": 149.798089
					  },
            {
                "name": "TARA HOSPITAL",
                "lat": -27.274158,
                "long": 150.45614
					  },
            {
                "name": "TEXAS HOSPITAL",
                "lat": -28.858094,
                "long": 151.179334
					  },
            {
                "name": "TOOWOOMBA HOSPITAL",
                "lat": -27.570508,
                "long": 151.946747
					  },
            {
                "name": "WANDOAN HOSPITAL",
                "lat": -26.119396,
                "long": 149.957076
					  },
            {
                "name": "WARWICK HOSPITAL",
                "lat": -28.22359,
                "long": 152.017921
					  },
            {
                "name": "WONDAI HOSPITAL",
                "lat": -26.322306,
                "long": 151.878911
					  },
            {
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
					  },
            {
                "name": "BOWEN HOSPITAL",
                "lat": -20.008748,
                "long": 148.241406
					  },
            {
                "name": "CLERMONT HOSPITAL",
                "lat": -22.829953,
                "long": 147.632769
					  },
            {
                "name": "COLLINSVILLE HOSPITAL",
                "lat": -20.549854,
                "long": 147.841355
					  },
            {
                "name": "DYSART HOSPITAL",
                "lat": -22.588785,
                "long": 148.348721
					  },
            {
                "name": "MACKAY BASE HOSPITAL",
                "lat": -21.145579,
                "long": 149.156151
					  },
            {
                "name": "MORANBAH HOSPITAL",
                "lat": -22.002952,
                "long": 148.054628
					  },
            {
                "name": "PROSERPINE HOSPITAL",
                "lat": -20.399854,
                "long": 148.585628
					  },
            {
                "name": "SARINA HOSPITAL",
                "lat": -21.421579,
                "long": 149.210577
					  },
            {
                "name": "MATER ADULT PUBLIC HOSPITAL",
                "lat": -27.485051,
                "long": 153.027012
					  },
            {
                "name": "MATER CHILDREN'S PUBLIC HOSPITAL",
                "lat": -27.485051,
                "long": 153.027012
					  },
            {
                "name": "MATER MOTHERS' PUBLIC HOSPITAL",
                "lat": -27.485051,
                "long": 153.027012
					  },
            {
                "name": "CABOOLTURE HOSPITAL",
                "lat": -27.078875,
                "long": 152.958257
					  },
            {
                "name": "KILCOY HOSPITAL",
                "lat": -26.939823,
                "long": 152.562002
					  },
            {
                "name": "REDCLIFFE HOSPITAL",
                "lat": -27.229905,
                "long": 153.107351
					  },
            {
                "name": "ROYAL BRISBANE & WOMEN'S HOSPITAL",
                "lat": -27.44585,
                "long": 153.028591
					  },
            {
                "name": "THE PRINCE CHARLES HOSPITAL",
                "lat": -27.39299,
                "long": 153.028005
					  },
            {
                "name": "BEAUDESERT HOSPITAL",
                "lat": -27.985686,
                "long": 153.002309
					  },
            {
                "name": "LOGAN HOSPITAL",
                "lat": -27.670098,
                "long": 153.138666
					  },
            {
                "name": "PRINCESS ALEXANDRA HOSPITAL",
                "lat": -27.494593,
                "long": 153.034676
					  },
            {
                "name": "QUEEN ELIZABETH II JUBILEE HOSPITAL",
                "lat": -27.558738,
                "long": 153.050695
					  },
            {
                "name": "REDLAND HOSPITAL",
                "lat": -27.541472,
                "long": 153.250201
					  },
            {
                "name": "WYNNUM HOSPITAL",
                "lat": -27.47444,
                "long": 153.17709
					  },
            {
                "name": "BURKETOWN HEALTH CLINIC",
                "lat": -17.740757,
                "long": 139.548102
					  },
            {
                "name": "CAMOOWEAL HEALTH CLINIC",
                "lat": -19.920523,
                "long": 138.120116
					  },
            {
                "name": "CLONCURRY HOSPITAL",
                "lat": -20.703227,
                "long": 140.526962
					  },
            {
                "name": "DAJARRA HEALTH CLINIC",
                "lat": -21.694306,
                "long": 139.514478
					  },
            {
                "name": "DOOMADGEE HOSPITAL",
                "lat": -17.942158,
                "long": 138.82595
					  },
            {
                "name": "JULIA CREEK HOSPITAL",
                "lat": -20.656705,
                "long": 141.750243
					  },
            {
                "name": "KARUMBA HEALTH CLINIC",
                "lat": -17.484742,
                "long": 140.847124
					  },
            {
                "name": "MORNINGTON ISLAND HOSPITAL",
                "lat": -16.665153,
                "long": 139.17952
					  },
            {
                "name": "MOUNT ISA HOSPITAL",
                "lat": -20.730455,
                "long": 139.493879
					  },
            {
                "name": "NORMANTON HOSPITAL",
                "lat": -17.6716,
                "long": 141.080584
					  },
            {
                "name": "AUGATHELLA HOSPITAL",
                "lat": -25.79621,
                "long": 146.586323
					  },
            {
                "name": "CHARLEVILLE HOSPITAL",
                "lat": -26.410891,
                "long": 146.238457
					  },
            {
                "name": "CUNNAMULLA HOSPITAL",
                "lat": -28.070104,
                "long": 145.688445
					  },
            {
                "name": "DIRRANBANDI HOSPITAL",
                "lat": -28.578802,
                "long": 148.228943
					  },
            {
                "name": "INJUNE HOSPITAL",
                "lat": -25.84672,
                "long": 148.563048
					  },
            {
                "name": "MITCHELL HOSPITAL",
                "lat": -26.491356,
                "long": 147.97435
					  },
            {
                "name": "MORVEN OUTPATIENTS CLINIC",
                "lat": -26.437844,
                "long": 147.019872
					  },
            {
                "name": "MUNGINDI HOSPITAL",
                "lat": -28.971439,
                "long": 148.987797
					  },
            {
                "name": "QUILPIE HOSPITAL",
                "lat": -26.615755,
                "long": 144.273821
					  },
            {
                "name": "ROMA HOSPITAL",
                "lat": -26.569812,
                "long": 148.773816
					  },
            {
                "name": "ST GEORGE HOSPITAL",
                "lat": -28.030093,
                "long": 148.593189
					  },
            {
                "name": "SURAT HOSPITAL",
                "lat": -27.156632,
                "long": 149.069518
					  },
            {
                "name": "THARGOMINDAH HOSPITAL",
                "lat": -27.99702,
                "long": 143.821544
					  },
            {
                "name": "WALLUMBILLA OUTPATIENTS CLINIC",
                "lat": -26.509645,
                "long": 149.155894
					  },
            {
                "name": "CALOUNDRA HOSPITAL",
                "lat": -26.80002,
                "long": 153.120731
					  },
            {
                "name": "GYMPIE HOSPITAL",
                "lat": -26.184192,
                "long": 152.658319
					  },
            {
                "name": "MALENY HOSPITAL",
                "lat": -26.755249,
                "long": 152.845352
					  },
            {
                "name": "NAMBOUR HOSPITAL",
                "lat": -26.623073,
                "long": 152.954863
					  },
            {
                "name": "BAMAGA HOSPITAL",
                "lat": -10.895278,
                "long": 142.385073
					  },
            {
                "name": "BAMAGA PRIMARY HEALTH CARE CENTRE",
                "lat": -10.886528,
                "long": 142.38804
					  },
            {
                "name": "THURSDAY ISLAND HOSPITAL",
                "lat": -10.585327,
                "long": 142.215898
					  },
            {
                "name": "THURSDAY ISLAND PRIMARY HEALTH CARE CENTRE",
                "lat": -10.583858,
                "long": 142.219353
					  },
            {
                "name": "AYR HOSPITAL",
                "lat": -19.563792,
                "long": 147.407745
					  },
            {
                "name": "CHARTERS TOWERS HOSPITAL",
                "lat": -20.07608,
                "long": 146.264155
					  },
            {
                "name": "HOME HILL HOSPITAL",
                "lat": -19.664446,
                "long": 147.414198
					  },
            {
                "name": "HUGHENDEN HOSPITAL",
                "lat": -20.856245,
                "long": 144.201571
					  },
            {
                "name": "INGHAM HOSPITAL",
                "lat": -18.652328,
                "long": 146.156674
					  },
            {
                "name": "JOYCE PALMER HEALTH SERVICE",
                "lat": -18.733154,
                "long": 146.579407
					  },
            {
                "name": "MAGNETIC ISLAND HEALTH SERVICE CENTRE",
                "lat": -19.157708,
                "long": 146.849637
					  },
            {
                "name": "RICHMOND HOSPITAL",
                "lat": 33.470909,
                "long": -81.989885
					  },
            {
                "name": "TOWNSVILLE HOSPITAL",
                "lat": -19.321049,
                "long": 146.760758
					  },
            {
                "name": "THE TOWNSVILLE HOSPITAL BIRTH CENTRE",
                "lat": -19.321049,
                "long": 146.760758
					  },
            {
                "name": "BOONAH HOSPITAL",
                "lat": -27.998451,
                "long": 152.678127
					  },
            {
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
                "name": "IPSWICH HOSPITAL",
                "lat": -27.619517,
                "long": 152.757658
					  },
            {
                "name": "LAIDLEY HOSPITAL",
                "lat": -27.632641,
                "long": 152.400065
					  },
            {
                "name": "BIGGENDEN HOSPITAL",
                "lat": -25.508005,
                "long": 152.049884
					  },
            {
                "name": "BUNDABERG HOSPITAL",
                "lat": -24.86796,
                "long": 152.341774
					  },
            {
                "name": "CHILDERS HOSPITAL",
                "lat": -25.239461,
                "long": 152.273071
					  },
            {
                "name": "EIDSVOLD HOSPITAL",
                "lat": -25.30046,
                "long": 150.335008
					  },
            {
                "name": "GAYNDAH HOSPITAL",
                "lat": -25.631511,
                "long": 151.604281
					  },
            {
                "name": "GIN GIN HOSPITAL",
                "lat": -24.986146,
                "long": 151.953699
					  },
            {
                "name": "HERVEY BAY HOSPITAL",
                "lat": -25.300573,
                "long": 152.82218
					  },
            {
                "name": "MARYBOROUGH HOSPITAL",
                "lat": -25.522841,
                "long": 152.68935
					  },
            {
                "name": "MONTO HOSPITAL",
                "lat": -24.86477,
                "long": 151.113006
					  },
            {
                "name": "MOUNT PERRY HEALTH CENTRE",
                "lat": -25.179911,
                "long": 151.645055
					  },
            {
                "name": "MUNDUBBERA HOSPITAL",
                "lat": -25.588104,
                "long": 151.297842
					  },
            {
                "name": "KUBIN PRIMARY HEALTH CARE CENTRE",
                "lat": -10.226584,
                "long": 142.220113
					  },
            {
                "name": "NEW MAPOON HEALTH CENTRE",
                "lat": -10.886528,
                "long": 142.38804
					  },
            {
                "name": "DUARINGA OUTPATIENTS CLINIC",
                "lat": -23.715292,
                "long": 149.675979
					  },
            {
                "name": "GLENMORGAN OUTPATIENTS CLINIC",
                "lat": -27.248146,
                "long": 149.676599
					  },
            {
                "name": "MARIE ROSE CENTRE",
                "lat": -27.497539,
                "long": 153.399837
					  },
            {
                "name": "BADU ISLAND PRIMARY HEALTH CARE CENTRE",
                "lat": -10.116416,
                "long": 142.127548
					  },
            {
                "name": "BOIGU ISLAND PRIMARY HEALTH CARE CENTRE",
                "lat": -9.274053,
                "long": 142.223094
					  },
            {
                "name": "COCONUT ISLAND HEALTH CENTRE",
                "lat": -10.049654,
                "long": 143.069406
					  },
            {
                "name": "DARNLEY ISLAND PRIMARY HEALTH CARE CENTRE",
                "lat": -9.586448,
                "long": 143.764037
					  },
            {
                "name": "DAUAN ISLAND PRIMARY HEALTH CARE CENTRE",
                "lat": -9.421736,
                "long": 142.53623
					  },
            {
                "name": "HORN ISLAND PRIMARY HEALTH CARE CENTRE",
                "lat": -10.611642,
                "long": 142.286865
					  },
            {
                "name": "INJINOO PRIMARY HEALTH CARE CENTRE",
                "lat": -10.886528,
                "long": 142.38804
					  },
            {
                "name": "ISLAND MEDICAL SERVICE",
                "lat": -10.585327,
                "long": 142.215898
					  },
            {
                "name": "MURRAY ISLAND PRIMARY HEALTH CENTRE",
                "lat": -9.918603,
                "long": 144.04939
					  },
            {
                "name": "SAIBAI ISLAND PRIMARY HEALTH CARE CENTRE",
                "lat": -9.405128,
                "long": 142.6921
					  },
            {
                "name": "SEISIA PRIMARY HEALTH CARE CENTRE",
                "lat": -10.58347,
                "long": 142.219183
					  },
            {
                "name": "ST PAUL'S PRIMARY HEALTH CARE CENTRE",
                "lat": -27.698484,
                "long": 153.021345
					  },
            {
                "name": "STEPHEN ISLAND PRIMARY HEALTH CARE CENTRE",
                "lat": -9.515261,
                "long": 143.551071
					  },
            {
                "name": "WARRABER ISLAND PRIMARY HEALTH CARE CENTRE",
                "lat": -10.208223,
                "long": 142.824569
					  },
            {
                "name": "YAM ISLAND PRIMARY HEALTH CARE CENTRE",
                "lat": -9.902981,
                "long": 142.775032
					  },
            {
                "name": "YORKE ISLAND PRIMARY HEALTH CARE CENTRE",
                "lat": -10.58347,
                "long": 142.219183
					  },
            {
                "name": "UMAGICO PRIMARY HEALTH CARE CENTRE",
                "lat": -10.58347,
                "long": 142.219183
					  }
					]

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
    });


});
