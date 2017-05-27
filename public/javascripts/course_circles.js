var gl_exponent = 2;
var gl_averagetype = 1;
var gl_order = 'reviews';
var gl_size = 0;
function makeCourseCircles(courses) {
  width = screen.width*100;
  height = screen.height/5;
  var linearScale = d3.scale.pow()
          .exponent(gl_exponent)
          .domain([0, 5])
          .range(["red", "green"]);
   var svgContainer = d3.select("#circlesCourse").append("svg")
                                       .attr("width", width)
                                       .attr("id", 'course')
                                       .attr("height", height)
                                       .attr('stroke','black')
   var circles = svgContainer.selectAll("circle")
                             .data(courses)
                             .enter()
                           .append("circle")
  currentX = 70;
  prevradius = 0;
  currentY = screen.height/10;
  var circleAttributes = circles
                        .attr("cx", function (d) {currentX += prevradius*2 + 20;
                           prevradius=d.reviews/5;
                           return currentX; })
                        .attr("cy", function (d) { currentY += 0; return currentY; })
                        .attr("r", function (d) { return d.reviews/5; })
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
                           document.getElementById('courseName').innerHTML=d.subject+" "+d.code+': <br>';
                           document.getElementById('courseId').innerHTML=d.courseid;
                           $('#courseId').hide();
                           document.getElementById('courseReviews').innerHTML=d.reviews+' Reviews';
                           document.getElementById('courseOtherInfo').innerHTML="Content: "+d.content+"<br> Grading: "+d.grading+"<br> Workload: "+d.workload+"<br> Teaching: "+d.teaching;
                           document.getElementById('courseOverall').innerHTML="Overall Average: "+avg.toPrecision(5);
                          })
                        .on('click',function() {
                          getCoursecontent(d3.select(this)[0][0].__data__.courseid);
                          //var data = d3.select(this)[0][0].__data__;
                          //window.location.href='instructor?id='+data.instructorid;
                        })

}
function changeCourseorder(averagetype,exponent,order) {
  gl_order = order;
  d3.select("#course").remove();
  $.post('/course/adjustinput',{
    'order': gl_order,
    'size': gl_size
  },function(result) {
    makeCourseCircles(result);
  });
}

function limitCoursesize() {
  d3.select("#course").remove();
  gl_size = parseInt($('#courseSize').val());
  $.post('/course/adjustinput', {
    'order': gl_order,
    'size': gl_size
  }, function(result) {
    makeCourseCircles(result);
  });
}

function changeCourseexponent() {
  d3.select("#course").remove();
  console.log($("#courseExponent").val());
  gl_exponent = parseInt($("#courseExponent").val());
  $.post('/course/adjustinput',{
    'order': gl_order,
    'size' : gl_size
  },function(result) {
    makeCourseCircles(result);
  });
}
function getCoursecontent() {
  console.log("Inside Course Content");
  console.log("Using ID " + $("#courseId").text());
  $.post('/course/content',{
    'id': parseInt($("#courseId").text())},
    function(result) {
      console.log("The results are " + JSON.stringify(result));
      $("#courseContent").empty();
      if($("#courseBanner").length) {
          $("#courseBanner").empty();
          $("#courseBanner").text("Content Comments");
      }
      else {
        $("#courseContent").before("<h3 id='courseBanner'> Content Comments </h3>")
      }
      for(i = 0; i < result.length;i++) {
        $('#courseContent').append("<li> Rating:"+result[i].ratingcontent+
        " Course :" + result[i].subject+result[i].code+
        "<br>"+result[i].commentcontent+"</li>");
      }
    });
}
function getCoursegrading() {
  $.post('/course/grading',{
    'id': $("#courseId").text()},
    function(result) {
      $("#courseContent").empty();
      if($("#courseBanner").length) {
          $("#courseBanner").empty();
          $("#courseBanner").text("Grading Comments");
      }
      else {
        $("#courseContent").before("<h3 id='courseBanner'> Grading Comments </h3>")
      }
      for(i = 0; i < result.length;i++) {
        $('#courseContent').append("<li> Rating:"+result[i].ratinggrading+
        " Course :" + result[i].subject+result[i].code+
        "<br>"+result[i].commentgrading+"</li>");
      }
    });
}
function getCourseteaching() {
  $.post('/course/teaching',{
    'id': $("#courseId").text()},
    function(result) {
      $("#courseContent").empty();
      if($("#courseBanner").length) {
          $("#courseBanner").empty();
          $("#courseBanner").text("Teaching Comments");
      }
      else {
        $("#courseContent").before("<h3 id='courseBanner'> Teaching Comments </h3>")
      }
      for(i = 0; i < result.length;i++) {
        $('#courseContent').append("<li> Rating:"+result[i].ratingteaching+
        " Course :" + result[i].subject+result[i].code+
        "<br>"+result[i].commentteaching+"</li>");
      }
    });
}
function getCourseworkload() {
  $.post('/course/workload',{
    'id': $("#courseId").text()},
    function(result) {
      $("#courseContent").empty();
      if($("#courseBanner").length) {
          $("#courseBanner").empty();
          $("#courseBanner").text("Workload Comments");
      }
      else {
        $("#courseContent").before("<h3 id='courseBanner'> Workload Comments </h3>")
      }
      for(i = 0; i < result.length;i++) {
        $('#courseContent').append("<li> Rating:"+result[i].ratingworkload+
        " Course :" + result[i].subject+result[i].code+
        "<br>"+result[i].commentworkload+"</li>");
      }
    });
}
