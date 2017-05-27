var express = require('express');
var router = express.Router();

var db = require('../public/javascripts/db.js')

/* GET users listing. */
router.post('/content', function(req, res, next) {
  db.any("select review.commentcontent,review.ratingcontent,course.subject,course.code from review,course "+
  "where course.id = review.courseid and course.id=$1 " +
  "order by review.ratingcontent desc",[req.body.id])
         .then(function(result) {
           res.send(result);
         }).catch(function(error) {
           res.send("ERROR: " + error);
         });
});
router.post('/grading', function(req, res, next) {
  db.any("select review.commentgrading,review.ratinggrading,course.subject,course.code from review,course "+
  "where course.id = review.courseid and course.id=$1 " +
  "order by review.ratinggrading desc",[req.body.id])
         .then(function(result) {
           res.send(result);
         }).catch(function(error) {
           res.send("ERROR: " + error);
         });
});
router.post('/teaching', function(req, res, next) {
  db.any("select review.commentteaching,review.ratingteaching,course.subject,course.code from review,course "+
  "where course.id = review.courseid and course.id=$1 " +
  "order by review.ratingteaching desc",[req.body.id])
         .then(function(result) {
           res.send(result);
         }).catch(function(error) {
           res.send("ERROR: " + error);
         });
});
router.post('/workload', function(req, res, next) {
  db.any("select review.commentworkload,review.ratingworkload,course.subject,course.code from review,course "+
  "where course.id = review.courseid and course.id=$1 " +
  "order by review.ratingworkload desc",[req.body.id])
         .then(function(result) {
           res.send(result);
         }).catch(function(error) {
           res.send("ERROR: " + error);
         });
});

router.post('/adjustinput', function(req, res, next) {
  db.any("select * from (select subject,code,courseid,round(avg(review.ratingcontent)::numeric,2) AS content," +
  "round(avg(review.ratingteaching)::numeric,2) AS teaching,round(avg(review.ratinggrading)::numeric,2) AS grading," +
  "round(avg(review.ratingworkload)::numeric,2) AS workload,count(review.reviewid) AS reviews " +
  "from review,course where review.courseid = course.id group by subject,code,courseid) AS a " +
  "where a.reviews > $2 order by $1# DESC",[req.body.order,req.body.size])
         .then(function(result) {
           res.send(result);
         }).catch(function(error) {
           res.send("ERROR: " + error);
         });
});

module.exports = router;
