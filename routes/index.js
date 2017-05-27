var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  db.tx(t => {
        return t.batch([
            t.any("select * from (select name,instructorid,round(avg(ratingcontent)::numeric,2) AS content," +
            "round(avg(ratingteaching)::numeric,2) AS teaching,round(avg(ratinggrading)::numeric,2) AS grading," +
            "round(avg(ratingworkload)::numeric,2) AS workload,count(reviewid) AS reviews " +
            "from review,instructor where review.instructorid = instructor.id group by instructorid,name) AS a " +
            "where instructorid > 0 order by reviews DESC"),
            t.any("select * from (select subject,code,courseid,round(avg(review.ratingcontent)::numeric,2) AS content," +
            "round(avg(review.ratingteaching)::numeric,2) AS teaching,round(avg(review.ratinggrading)::numeric,2) AS grading," +
            "round(avg(review.ratingworkload)::numeric,2) AS workload,count(review.reviewid) AS reviews " +
            "from review,course where review.courseid = course.id group by subject,code,courseid) AS a " +
            "order by a.reviews DESC")
        ]);
    })
    // using .spread(function(user, event)) is best here, if supported;
    .then(data => {
      res.render('index',{'title': 'Review Analysis','instructors':data[0],'course':data[1]});
    })
    .catch(error => {
      res.send("ERROR: " + error);
    })});





module.exports = router;
