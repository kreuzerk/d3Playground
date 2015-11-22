/**
 * Created by Kiwi on 22.11.15.
 */
var svg = d3.select("#axissvg");

var scale = d3.scale.linear()
    .domain([20, 30])
    .range([10, 200]);

var axis = d3.svg.axis()
    .scale(scale)
    .orient("bottom") //left, right, top
    .ticks(4); //best guess
//.tickValues([20, 25, 30]) //specify exact values

var g = svg.append("g");
axis(g);
g.attr("transform", "translate(50, 50)");
g.selectAll("path")
    .style({ fill: "none", stroke: "#000"});
g.selectAll("line")
    .style({ stroke: "#000"});