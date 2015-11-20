/**
 * Created by Kiwi on 20.11.15.
 */

var svg = d3.select("#timebrushsvg");

var data = pics.data.children;

//Convert data to correct time format
data.forEach(function(d){
    d.data.created *= 1000;
});

var extent = d3.extent(data, function(d){
    return d.data.created;
});

var xScale = d3.time.scale()
    .domain(extent)
    .range([0, 500]);

var brush = d3.svg.brush();
brush.x(xScale);

brush.on("brushend", function(){
    console.log(brush.extent());

    var actualSelection = brush.extent();       //Gives me an Array of min and max

    var filtereddata = data.filter(function(d){
        return (d.data.created > actualSelection[0] && d.data.created < actualSelection[1])
    });

    filtereddata.forEach(function(d){
        console.log(d.data.created);
    });

    /*
        So werden die Striche (Rects) bei einer neuen Selektierung wieder schwarz
     */
    g.selectAll("rect.events")
        .attr({
            style: "none"
        });

    g.selectAll("rect.events")
        /*
        Diese zweite Funktion ist unbedingt nötig, ansonsten fängt er an zu Zählen und highlightet die ersten
        5 Einträge. Diese führt dann zu komischen Reusltaten. Hier highlightet er nur die Daten mit der entsprechenden
        Id. Also die Daten die mit den Ids der Filtered Datas übereinstimmen.
         */

        .data(filtereddata, function(d){ return d.data.id})
        .style({
            stroke: "white"
        })
});

var g = svg.append("g");
g.attr("transform, translate(10,10)");
brush(g);

g.attr("transform", "translate(50, 100)");
g.selectAll("rect").attr("height", 30);
g.selectAll(".background")
    .style({fill: "#4B9E9E", visibility: "visible"});
g.selectAll(".extent")
    .style({fill: "#78C5C5", visibility: "visible"});
g.selectAll(".resize rect")
    .style({fill: "#276C86", visibility: "visible"});

/*
Use a class rects.events otherwise there can be problems with other classes
For example: The brush consits of 4 rects.
 */

var rects = g.selectAll("rects.events")
    .data(data)
    .enter()
    .append("rect").classed("events", true);

rects.attr({
    x: function(d){ return xScale(d.data.created)},
    y: 0,
    height: 30,
    width: 2
});