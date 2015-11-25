/**
 * Created by Kiwi on 24.11.15.
 */

d3.json("json/pics.json", function (error, pics) {
    var data = pics.data.children;
    var transformCreatedToMilis = function (data) {
        data.forEach(function (d) {
            d.data.created *= 1000;
        })
    };
    transformCreatedToMilis(data);

    var gluedsvg = d3.select("#gluedsvg");

    //Create the "SVG" container
    var svgGroup = gluedsvg.append("g");
    var scatterplot = d3.chart.scatter();
    scatterplot.data(data);
    scatterplot(svgGroup);

    //Create the "Brush" Containter
    var brushGroup = gluedsvg.append("g");
    var brush = d3.chart.brush();
    brush.data(data);
    brush(brushGroup);
});