var gl_exponent = 2;
var gl_averagetype = 1;
var gl_order = 'reviews';
var gl_size = 0;
function makeInstructorCircles(instructors) {
  width = screen.width*100;
  height = screen.height/5;
  var linearScale = d3.scale.pow()
          .exponent(gl_exponent)
          .domain([0, 5])
          .range(["red", "green"]);
   var svgContainer = d3.select("#circles").append("svg")
                                       .attr("width", width)
                                       .attr("height", height)
                                       .attr('stroke','black')
   var circles = svgContainer.selectAll("circle")
                             .data(instructors)
                             .enter()
                           .append("circle")
  currentX = 70;
  prevradius = 0;
  currentY = screen.height/10;
  var circleAttributes = circles
                        .attr("cx", function (d) {currentX += prevradius*2 + 20;
                           prevradius=d.reviews;
                           return currentX; })
                        .attr("cy", function (d) { currentY += 0; return currentY; })
                        .attr("r", function (d) { return d.reviews; })
                        .style("fill", function(d) {
                          var avg = 0.0;
                          if(gl_averagetype == 1) {
                            avg = (parseFloat(d.content) + parseFloat(d.grading) + parseFloat(d.workload) + parseFloat(d.teaching))/4;
                          }
                          else {
                            avg = (10*4.066 + (parseFloat(d.content) + parseFloat(d.grading) + parseFloat(d.workload) + parseFloat(d.teaching)))/14
                          }

                          return linearScale(avg);
                         })
                         .on("mouseover", function() {
                           var d = d3.select(this)[0][0].__data__;
                           if(gl_averagetype == 1) {
                             var avg = (parseFloat(d.content) + parseFloat(d.grading) + parseFloat(d.workload) + parseFloat(d.teaching))/4;
                           }
                           else {
                             avg = (10*4.066 + (parseFloat(d.content) + parseFloat(d.grading) + parseFloat(d.workload) + parseFloat(d.teaching)))/14
                           }
                           document.getElementById('name').innerHTML=d.name+': <br>';
                           document.getElementById('id').innerHTML=d.instructorid;
                           $('#id').hide();
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


function changeorder(averagetype,exponent,order) {
  gl_order = order;
  d3.select("svg").remove();
  $.post('/instructor/adjustinput',{
    'order': gl_order,
    'size': gl_size
  },function(result) {
    makeInstructorCircles(result);
  });
}

function limitsize() {
  d3.select("svg").remove();
  gl_size = parseInt($('#size').val());
  $.post('/instructor/adjustinput', {
    'order': gl_order,
    'size': gl_size
  }, function(result) {
    makeInstructorCircles(result);
  });
}

function changeexponent() {
  d3.select("svg").remove();
  console.log($("#exponent").val());
  gl_exponent = parseInt($("#exponent").val());
  $.post('/instructor/adjustinput',{
    'order': gl_order,
    'size' : gl_size
  },function(result) {
    makeInstructorCircles(result);
  });
}
function getcontent() {
  $.post('/instructor/content',{
    'id': $("#id").text()},
    function(result) {
      $("#content").empty();
      if($("#banner").length) {
          $("#banner").empty();
          $("#banner").text("Content Comments");
      }
      else {
        $("#content").before("<h3 id='banner'> Content Comments </h3>")
      }
      for(i = 0; i < result.length;i++) {
        $('#content').append("<li> Rating:"+result[i].ratingcontent+
        " Course :" + result[i].subject+result[i].code+
        "<br>"+result[i].commentcontent+"</li>");
      }
    });
}
function getgrading() {
  $.post('/instructor/grading',{
    'id': $("#id").text()},
    function(result) {
      $("#content").empty();
      if($("#banner").length) {
          $("#banner").empty();
          $("#banner").text("Grading Comments");
      }
      else {
        $("#content").before("<h3 id='banner'> Grading Comments </h3>")
      }
      for(i = 0; i < result.length;i++) {
        $('#content').append("<li> Rating:"+result[i].ratinggrading+
        " Course :" + result[i].subject+result[i].code+
        "<br>"+result[i].commentgrading+"</li>");
      }
    });
}
function getteaching() {
  $.post('/instructor/teaching',{
    'id': $("#id").text()},
    function(result) {
      $("#content").empty();
      if($("#banner").length) {
          $("#banner").empty();
          $("#banner").text("Teaching Comments");
      }
      else {
        $("#content").before("<h3 id='banner'> Teaching Comments </h3>")
      }
      for(i = 0; i < result.length;i++) {
        $('#content').append("<li> Rating:"+result[i].ratingteaching+
        " Course :" + result[i].subject+result[i].code+
        "<br>"+result[i].commentteaching+"</li>");
      }
    });
}
function getworkload() {
  $.post('/instructor/workload',{
    'id': $("#id").text()},
    function(result) {
      $("#content").empty();
      if($("#banner").length) {
          $("#banner").empty();
          $("#banner").text("Workload Comments");
      }
      else {
        $("#content").before("<h3 id='banner'> Workload Comments </h3>")
      }
      for(i = 0; i < result.length;i++) {
        $('#content').append("<li> Rating:"+result[i].ratingworkload+
        " Course :" + result[i].subject+result[i].code+
        "<br>"+result[i].commentworkload+"</li>");
      }
    });
}
