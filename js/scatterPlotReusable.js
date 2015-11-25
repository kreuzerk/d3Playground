/**
 * Created by Kiwi on 24.11.15.
 */

if(!d3.chart){
    d3.chart = {};
}

d3.chart.scatter = function(){
    var g;
    var data;
    var width = 400;
    var height = 400;

    function chart(container){
        g = container;

        var maxScore = d3.max(data, function(d){ return d.data.score});

        var xSqale = d3.time.scale()
            .domain(d3.extent(data, function(d){
                return d.data.created;
            }))
            .range([0, width]);

        var ySqale = d3.scale.linear()
            .domain([0, maxScore])
            .range([height, 0]);

        var circles = g.selectAll("circle")
            .data(data);

        circles.enter()
            .append("circle")
            .attr({
                cx: function(d, i){ return xSqale(d.data.created)},
                cy: function(d){ return ySqale(d.data.score) },
                r: 5
            })
            .on("mouseover", function (d){ console.log(d.data.created)});

        circles.exit().remove();
    }

    chart.data = function(value){
        if(!arguments.length){
            return data;
        }
        data = value;
        return chart;
    };

    chart.width = function(value){
        if(!arguments.length){
            return width;
        }
        width = value;
        return chart;
    };

    chart.height = function(value){
        if(!arguments.length){
            return height;
        }
        height = value;
        return chart;
    };

    return chart;
};