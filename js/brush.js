/**
 * Created by Kiwi on 19.11.15.
 */

(function() {
    var svg = d3.select("#brushsvg");

    var brushScale = d3.scale.linear()
        .domain([20, 100])
        .range([10, 500]);

    var brush = d3.svg.brush();
    brush.x(brushScale);
    brush.extent([50, 60]);

    brush.on("brushend", function () {
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

})();
