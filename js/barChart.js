/**
 * Created by Kiwi on 14.11.15.
 */
var minScaleValue = 0;
var maxScaleValue = 400;

var svg = d3.select("#barchartsvg");
var data = pics.data.children;
var g = svg.append("g");
g.attr("transform", "translate(10, 10)");

var maxScore = d3.max(data, function(d){ return d.data.score });

var ySqale = d3.scale.linear()
    .domain([0, maxScore])
    .range([minScaleValue, maxScaleValue]);

var xSqale = d3.scale.ordinal()
    .domain(d3.range(data.length))
    .rangeBands([0, 300], 0.5);

var bars = g.selectAll("rect")
    .data(data);

bars.enter()
    .append("rect")
    .attr({
        x: function(d, i){return xSqale(i)},
        y: function(d, i){return 400 - ySqale(d.data.score)},
        width: xSqale.rangeBand,
        height: function(d){return ySqale(d.data.score)},
    });

/*
bars.on("mouseover", function(d,i){console.log("Hallo Mama: " + d.data.score)});
*/