var express = require('express');
var router = express.Router();

var pgp = require('pg-promise')();

var db = pgp(process.env.DATABASE_URL || 'postgres://abishekpuri@localhost/course-reviews');
/* GET users listing. */
router.get('/', function(req, res, next) {
  db.any("select * from (select instructorid,round(avg(ratingcontent)::numeric,2) AS content," +
  "round(avg(ratingteaching)::numeric,2) AS teaching,round(avg(ratinggrading)::numeric,2) AS grading," +
  "round(avg(ratingworkload)::numeric,2) AS workload,count(reviewid) AS reviews " +
  "from review group by instructorid) AS a where a.instructorid = $1",req.param('id'))
         .then(function(result) {
           res.render('instructor',{'title': 'Instructor','stats':result})
         }).catch(function(error) {
           res.send("ERROR: " + error);
         });
});

module.exports = router;
