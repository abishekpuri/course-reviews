var express = require('express');
var router = express.Router();

var db = require('../public/javascripts/db.js')

/* GET users listing. */
router.post('/content', function(req, res, next) {
  db.any("select review.commentcontent,review.ratingcontent,course.subject,course.code from review,course "+
  "where course.id = review.courseid and instructorid=$1 " +
  "order by review.ratingcontent desc",[req.body.id])
         .then(function(result) {
           res.send(result);
         }).catch(function(error) {
           res.send("ERROR: " + error);
         });
});
router.post('/grading', function(req, res, next) {
  db.any("select review.commentgrading,review.ratinggrading,course.subject,course.code from review,course "+
  "where course.id = review.courseid and instructorid=$1 " +
  "order by review.ratinggrading desc",[req.body.id])
         .then(function(result) {
           res.send(result);
         }).catch(function(error) {
           res.send("ERROR: " + error);
         });
});
router.post('/teaching', function(req, res, next) {
  db.any("select review.commentteaching,review.ratingteaching,course.subject,course.code from review,course "+
  "where course.id = review.courseid and instructorid=$1 " +
  "order by review.ratingteaching desc",[req.body.id])
         .then(function(result) {
           res.send(result);
         }).catch(function(error) {
           res.send("ERROR: " + error);
         });
});
router.post('/workload', function(req, res, next) {
  db.any("select review.commentworkload,review.ratingworkload,course.subject,course.code from review,course "+
  "where course.id = review.courseid and instructorid=$1 " +
  "order by review.ratingworkload desc",[req.body.id])
         .then(function(result) {
           res.send(result);
         }).catch(function(error) {
           res.send("ERROR: " + error);
         });
});

module.exports = router;
