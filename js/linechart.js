/**
 * Created by Kiwi on 15.11.15.
 */

var svg = d3.select("#linechartsvg");
var data = pics.data.children
    .sort(function(a, b){
        return a.data.score - b.data.score
    });

var g = svg.append("g");

var chartHeight = 400;
var maxScore = d3.max(data, function(d){return d.data.score});
var xScale = d3.scale.ordinal()
    .domain(d3.range(data.length))
    .rangeBands([1, 500], 0.34);

var yScale = d3.scale.linear()
    .domain([0, maxScore])
    .range([chartHeight, 0]);

var line = d3.svg.line()
    .x(function(d, i){return xScale(i)})
    .y(function(d, i){return yScale(d.data.score)})
    .interpolate("basis");

    /*
    .interpolate() -> hier kann "line", "cardinal" oder "basis" gesetzt werden
    smooths the line
    Basis does not garantie that the line goes through each point
    
     */

g.append("path")
    .attr("d", line(data))
    .style({
        fill: "none",
        stroke: "black"
    });