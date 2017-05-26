
var pgp = require('pg-promise')();

var db = pgp(process.env.DATABASE_URL || 'postgres://abishekpuri@localhost/course-reviews');


// Exporting the database object for shared use:
module.exports = db;
