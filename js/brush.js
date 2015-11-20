/**
 * Created by Kiwi on 19.11.15.
 */

var svg = d3.select("#brushsvg");

var data = pics.data.children;

//convert to time stamp
data.forEach(function(d){
   d.data.created *= 1000;
});

var extent = d3.extent(data, function(d){
    return d.data.created;
});

console.log(extent);

var scale = d3.time.scale()
    .domain(extent)
    .range([10, 500]);

var brush = d3.svg.brush();
brush.x(scale);

brush.on("brushend", function(){
    console.log(brush.extent())
});

var g = svg.append("g");
g.attr("transform", "translate(10, 10)");

brush(g);
g.attr("transform", "translate(50, 100)");
g.selectAll("rect").attr("height", 30);
g.selectAll(".background")
    .style({fill: "#4B9E9E", visibility: "visible"});
g.selectAll(".extent")
    .style({fill: "#78C5C5", visibility: "visible"});
g.selectAll(".resize rect")
    .style({fill: "#276C86", visibility: "visible"});
