/**
 * Created by Kiwi on 21.11.15.
 */

var svg = d3.select("#histogramsvg");

var data = [0,1,4,1,2,5,0,7,4,3,6,9,0,2];

var hist = d3.layout.histogram()
    .value(function(d){ return d})
    .range([0, d3.max(data)])
    .bins(8);

var layout = hist(data);
console.log("Ich logge das Layout als String: " + layout);
console.log("Ich logge das Layout", layout);

var g = svg.append("g");

var rects = g.selectAll("rect")
    .data(layout);

rects.enter()
    .append("rect")
    .attr({
        x: function(d, i ){
            return 100 + i * 30
        },
        y: 50,
        width: 20,
        height: function(d){
            return 20 * d.length;
        }
    });

