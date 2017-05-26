
function makeInstructorCircles(instructors,averagetype,exp) {
  width = screen.width*100;
  height = screen.height/3;
  var linearScale = d3.scale.pow()
          .exponent(exp)
          .domain([0, 5])
          .range(["#11CBD7", "#F60C86"]);
   var svgContainer = d3.select("#circles").append("svg")
                                       .attr("width", width)
                                       .attr("height", height)
                                       .attr('stroke','black')
   var circles = svgContainer.selectAll("circle")
                             .data(instructors)
                             .enter()
                           .append("circle")
  currentX = 0;
  currentY = screen.height/6;
  var circleAttributes = circles
                        .attr("cx", function (d) { currentX += d.reviews*2 + 15; return currentX; })
                        .attr("cy", function (d) { currentY += 0; return currentY; })
                        .attr("r", function (d) { return d.reviews*134/134; })
                        .style("fill", function(d) {
                          var avg = 0.0;
                          if(averagetype == 1) {
                            avg = (parseFloat(d.content) + parseFloat(d.grading) + parseFloat(d.workload) + parseFloat(d.teaching))/4;
                          }
                          else {
                            avg = (10*4.066 + (parseFloat(d.content) + parseFloat(d.grading) + parseFloat(d.workload) + parseFloat(d.teaching)))/14
                          }

                          return linearScale(avg);
                         })
                         .on("mouseover", function() {
                           var d = d3.select(this)[0][0].__data__;
                           if(averagetype == 1) {
                             var avg = (parseFloat(d.content) + parseFloat(d.grading) + parseFloat(d.workload) + parseFloat(d.teaching))/4;
                           }
                           else {
                             avg = (10*4.066 + (parseFloat(d.content) + parseFloat(d.grading) + parseFloat(d.workload) + parseFloat(d.teaching)))/14
                           }
                           document.getElementById('name').innerHTML=d.name+': ';
                           document.getElementById('reviews').innerHTML=d.reviews+' Reviews';
                           document.getElementById('otherinfo').innerHTML="Content: "+d.content+"<br> Grading: "+d.grading+"<br> Workload: "+d.workload+"<br> Teaching: "+d.teaching;
                           document.getElementById('overall').innerHTML="Overall Average: "+avg.toPrecision(5);
                          })
                        .on('click',function() {
                          getcontent(d3.select(this)[0][0].__data__.instructorid);
                          //var data = d3.select(this)[0][0].__data__;
                          //window.location.href='instructor?id='+data.instructorid;
                        })

}


function changeexponent(instructors,averagetype,exponent) {
  d3.select("svg").remove();
  makeInstructorCircles(instructors,averagetype,exponent);
}
function getcontent(id) {
  $.post('/instructor/content',{
    'id': id},
    function(result) {
      $("#content").empty();
      $("#content").before("<h3> Content Comments </h3>")
      for(i = 0; i < result.length;i++) {
        $('#content').append("<li> Rating:"+result[i].ratingcontent+
        " Course :" + result[i].subject+result[i].code+
        "<br>"+result[i].commentcontent+"</li>");
      }
    });
}
