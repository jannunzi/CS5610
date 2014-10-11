// load webservice and database libraries
var express = require('express');
var mongojs = require('mongojs');
var applications = require('./public/features/applications/server.js');

// instantiate both libraries and connecto to the cs5610353 database
var app = express();

// serve static content (html, css, js) in the public directory
app.use(express.static(__dirname + '/public'));

// configure express to parse JSON in the body of an HTTP request
app.use(express.bodyParser());

var mongodbConnectionString = "mongodb://admin:UpwCdvF5cYQa@127.12.162.130:27017/applications";
if (typeof process.env.OPENSHIFT_MONGODB_DB_URL == "undefined") {
    mongodbConnectionString = "cs5610353";
}
var db = mongojs(mongodbConnectionString, ["applications"]);

applications(app, db, mongojs);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get("/env", function (req, res) {
    res.json(process.env);
});

// listen to port 3000 in localhost
app.listen(port, ipaddress);
