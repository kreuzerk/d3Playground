/**
 * Created by Kiwi on 15.11.15.
 */

var svg = d3.select("#scatterplotsorted");

var data = pics.data.children
    .sort(function(a, b){
        return a.data.score - b.data.score;
    });

var maxScore = d3.max(data, function(d){ return d.data.score});

var ySqale = d3.scale.linear()
    .domain([0, maxScore])
    .range([400, 0]);


var g = svg.append("g");
var circles = g.selectAll("circle")
    .data(data);

circles.enter()
    .append("circle")
    .attr({
        cx: function(d, i){ return 20 + i * 15},
        cy: function(d){ return ySqale(d.data.score) },
        r: 5
    })
    .on("mouseover", function (d){ console.log(d.data.score)});