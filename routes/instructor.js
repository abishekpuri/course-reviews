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

module.exports = router;
