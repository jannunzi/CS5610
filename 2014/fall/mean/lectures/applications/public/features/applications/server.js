module.exports = function (app, db, mongojs) {
    // map incoming HTTP URL patterns to execute various functions
    // handle HTTP GET request to read all serviceClients from the database
    app.get("/applications", function (req, res) {
        db.applications.find(function (err, docs) {
            res.json(docs);
        });
    });

    // handle HTTP POST request to insert new serviceClients into the database
    app.post("/applications", function (req, res) {
        // the serviceClient is in the body of the HTTP request
        var svc = req.body;

        // insert new serviceClient object into the database collection serviceClients
        db.applications.insert(req.body, function (err, doc) {
            // respond with the new object that has been inserted
            res.json(doc);
        });
    });

    // handle HTTP GET request for a single serviceClient with :id parameter
    app.get("/applications/:id", function (req, res) {
        // parse id from the path parameter
        var id = req.params.id;
        // select the single document from the database
        db.applications.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
            // respond with the document retrieved from the database
            res.json(doc);
        });
    });

    // handle HTTP PUT request to update serviceClient instance with :id parameter
    app.put("/applications/:id", function (req, res) {
        db.applications.findAndModify({
            // find the object by id
            query: { _id: mongojs.ObjectId(req.params.id) },
            // new values are in req.body, update it's name
            update: { $set: { name: req.body.name } },
            // single one
            new: true
        }, function (err, doc, lastErrorObject) {
            // respond with the new document
            res.json(doc);
        });
    });

    // handle HTTP DELETE request to remove a serviceClient with :id parameter
    app.delete("/applications/:id", function (req, res) {
        // parse id from the path parameter
        var id = req.params.id;
        // find the document by id and remove it
        db.applications.remove({ _id: mongojs.ObjectId(id) },
            function (err, doc) {
                // respond with number of documents affected
                res.json(doc);
            });
    });
}