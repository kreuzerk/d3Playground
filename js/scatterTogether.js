/**
 * Created by Kiwi on 24.11.15.
 */

d3.chart.scatter = function(){
    var data;
    var width;

    function chart(container){

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
            return data;
        }
        data = value;
        return chart;
    };

    return chart;
};