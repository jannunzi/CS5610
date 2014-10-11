// load webservice and database libraries
var express = require('express');
var mongojs = require('mongojs');

// instantiate both libraries and connecto to the cs5610353 database
var app = express();
var db = mongojs("cs5610353", ["serviceClients"]);

// serve static content (html, css, js) in the public directory
app.use(express.static(__dirname + '/public'));

// configure express to parse JSON in the body of an HTTP request
app.use(express.bodyParser());

// map incoming HTTP URL patterns to execute various functions
// handle HTTP GET request to read all serviceClients from the database
app.get("/serviceClients", function (req, res) {
	db.serviceClients.find(function (err, docs) {
		res.json(docs);
	});
});

// handle HTTP POST request to insert new serviceClients into the database
app.post("/serviceClients", function (req, res) {
	// the serviceClient is in the body of the HTTP request
	var svc = req.body;

	// insert new serviceClient object into the database collection serviceClients
	db.serviceClients.insert(req.body, function (err, doc) {
		// respond with the new object that has been inserted
		res.json(doc);
	});
});

// handle HTTP GET request for a single serviceClient with :id parameter
app.get("/serviceClients/:id", function (req, res) {
	// parse id from the path parameter
	var id = req.params.id;
	// select the single document from the database
	db.serviceClients.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
		// respond with the document retrieved from the database
		res.json(doc);
	});
});

// handle HTTP PUT request to update serviceClient instance with :id parameter
app.put("/serviceClients/:id", function (req, res) {
	db.serviceClients.findAndModify({
		// find the object by id
		query: { _id: mongojs.ObjectId(req.params.id) },
		// new values are in req.body, update it's name
		update: { $set: { name: req.body.name } },
		// single one
		new: true
	}, function(err, doc, lastErrorObject) {
		// respond with the new document
		res.json(doc);
	});	
});

// handle HTTP DELETE request to remove a serviceClient with :id parameter
app.delete("/serviceClients/:id", function (req, res) {
	// parse id from the path parameter
	var id = req.params.id;
	// find the document by id and remove it
	db.serviceClients.remove({ _id: mongojs.ObjectId(id) },
		function (err, doc) {
			// respond with number of documents affected
			res.json(doc);
		});
});

// listen to port 3000 in localhost
app.listen(3000);
