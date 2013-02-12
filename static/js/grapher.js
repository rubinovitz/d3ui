function lineGraph(data){
 	"use strict";
        var margin = 50,
            width = 700 - margin,
            height = 300 - margin;
        
        var count_extent = d3.extent(
            data.times_square.concat(data.grand_central),
            function(d){return d.count}
        );

        var time_extent = d3.extent(
            data.times_square.concat(data.grand_central),
            function(d){return d.time}
        )
        
        var count_scale = d3.scale.linear()
            .domain(count_extent)
            .range([height, margin]);
        
        var time_scale = d3.time.scale()
            .domain(time_extent)
            .range([margin, width])
        
        var time_axis = d3.svg.axis()
            .scale(time_scale)
        
        var count_axis = d3.svg.axis()
            .scale(count_scale)
            .orient("left")
        
        var line = d3.svg.line()
            .x(function(d){return time_scale(d.time)})
            .y(function(d){return count_scale(d.count)})
            .interpolate("linear")
                    
        d3.select("body") 
          .append("svg")
            .attr("class","chart") 
            .attr("width", width+margin)
            .attr("height", height+margin)
        
        d3.select('svg')
          .append('path')
            .attr('d', line(data.times_square))
            .attr('class', 'times_square')
        
        d3.select('svg')
          .append('path')
            .attr('d', line(data.grand_central))
            .attr('class', 'grand_central')
        
        
        d3.select("svg")
          .selectAll("circle.times_square")
          .data(data.times_square)
          .enter()
          .append("circle")
            .attr("class", "times_square")

        d3.select("svg")
          .selectAll("circle.grand_central")
          .data(data.grand_central)
          .enter()
          .append("circle")
            .attr("class", "grand_central")
    
        d3.selectAll("circle")
            .attr("cy", function(d){return count_scale(d.count);})
            .attr("cx", function(d){return time_scale(d.time);})
            .attr("r", 3)
            
        d3.select("svg")
          .append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(time_axis);
         
        d3.select("svg")
          .append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + margin + ",0)")
          .call(count_axis);
    
      d3.select('.y.axis')
          .append('text')
          .text('mean number of turnstile revolutions')
          .attr('transform', "rotate (90, " + -margin + ", 0)")
          .attr('x', 20)
          .attr('y', 0)
                    
      d3.select('.x.axis')
        .append('text')
          .text('time')
          .attr('x', function(){return (width / 1.6) - margin})
          .attr('y', margin/1.5)
    
}