
function makeInstructorCircles(instructors) {
  width = screen.width;
  height = screen.height/1.5;
  var linearScale = d3.scale.pow()
          .exponent(5)
          .domain([0, 5])
          .range(["#11CBD7", "#F60C86"]);
   var svgContainer = d3.select("body").append("svg")
                                       .attr("width", width)
                                       .attr("height", height)
                                       .attr('stroke','black')
   var circles = svgContainer.selectAll("circle")
                             .data(instructors)
                             .enter()
                           .append("circle")

  var circleAttributes = circles
                        .attr("cx", function (d) { return 200+Math.random()*1000; })
                        .attr("cy", function (d) { return 200+Math.random()*300; })
                        .attr("r", function (d) { return d.reviews*100/134; })
                        .style("fill", function(d) {
                          var avg = (parseFloat(d.content) + parseFloat(d.grading) + parseFloat(d.workload) + parseFloat(d.teaching))/4;
                          return linearScale(avg);
                         })
                         .on("mouseover", function() {
                           var d = d3.select(this)[0][0].__data__;
                           var avg = (parseFloat(d.content) + parseFloat(d.grading) + parseFloat(d.workload) + parseFloat(d.teaching))/4;
                           document.getElementById('name').innerHTML=d.name+': ';
                           document.getElementById('reviews').innerHTML=d.reviews+' Reviews';
                           document.getElementById('otherinfo').innerHTML="Content: "+d.content+" Grading: "+d.grading+" Workload: "+d.workload+" Teaching: "+d.teaching;
                           document.getElementById('overall').innerHTML="Overall Average: "+avg.toPrecision(5);
                          })
                        .on('click',function() {
                          var data = d3.select(this)[0][0].__data__;
                          window.location.href='instructor?id='+data.instructorid;
                        })

}
