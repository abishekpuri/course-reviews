var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  db.any("select * from (select name,instructorid,round(avg(ratingcontent)::numeric,2) AS content," +
  "round(avg(ratingteaching)::numeric,2) AS teaching,round(avg(ratinggrading)::numeric,2) AS grading," +
  "round(avg(ratingworkload)::numeric,2) AS workload,count(reviewid) AS reviews " +
  "from review,instructor where review.instructorid = instructor.id group by instructorid,name) AS a " +
  "where instructorid > 0 order by reviews DESC")
         .then(function(result) {
           res.render('index',{'title': 'Overall Instructor Info','instructors':result})
         }).catch(function(error) {
           res.send("ERROR: " + error);
         });
});

module.exports = router;
