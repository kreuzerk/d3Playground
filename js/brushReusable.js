if(!d3.chart){
    d3.chart = {};
}

d3.chart.brush = function(){
    var g;
    var data;
    var width = 600;
    var height = 30;

    function chart(container){
        var g = container;

        var extent = d3.extent(data, function(d){
            return d.data.created;
        });

        var xScale = d3.time.scale()
            .domain(extent)
            .range([0, width]);

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

        brush(g);

        g.selectAll("rect").attr("height", height);
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
            height: height,
            width: 2
        });

        //rects.exit().remove();
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