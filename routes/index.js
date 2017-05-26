var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();

var db = pgp(process.env.DATABASE_URL || 'postgres://abishekpuri@localhost/course-reviews');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.any('SELECT name,id FROM instructor where id > 0')
  .then(function(result) {
    res.render('index',{'title': 'All Instructors','instructors':result})
  }).catch(function(error) {
    res.send("ERROR: " + error);
  });
});

module.exports = router;
