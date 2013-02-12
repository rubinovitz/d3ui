var djen = {

		init: function(params){
			// check for user specified parameters, if not specified use defaults
			self.margin = params.margin.typeof != number ? 50 : params.margin;
			self.width = params.width.typeof != number ? 700 - self.margin : params.width;
			self.height = params.height.typeof != number ? 300 - self.margin  : params.height;
			self.title = params.height != undefined  ? ""  : params.title;
			self.data = params.data;	
			
		},


		/** barGraph: 
			build a bar graph from the data 
			args:
				data:  {bar1: ["count": number, "name": string]},
					where count is the y value and name is the x-label for a bar.
		**/
		barGraph: function(data){
			"use strict";
			d3.select("div#graph-container")
				.append("div")
				.attr("class", "chart")
				.selectAll("div.bar")
				.data(data.bar) // for all counts
				.enter()
				.append("div")
				.attr("class", "line")
			
		d3.selectAll("div.line")
				.append("div")
				.attr("class","label")
				.text(function(d){return d.name })

			d3.selectAll("div.line")
				.append("div")
				.attr("class", "bar")
				.style("width", function(d){ return d.count/100 + "px"})
				.text(function(d){return Math.round(d.count)});
				 
		},

		lineGraph:function(data, params){
	/*		if (!data) throw "no data given";
			"use strict";
			self.init(params);
			var margin = self.margin,
				width = self.width,
				height = self.height,
				title = self.title,
				xLabel = params.xLabel,
				yLabel = params.yLabel,
				title, params.title,
				numberOfLines = Object.keys(data).length; // get number of lines in line graph

			// get extent of y points
			var extent_y = d3.
				self.data[xLabel].concat(self.data[
			},

			// get extent of x points
			var extent_x =


			// get scale for x axis
			var x_scale = 


			// get scale for y axis
			var y_scale =  

*/

		}

};
