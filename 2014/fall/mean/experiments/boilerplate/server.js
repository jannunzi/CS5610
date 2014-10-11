var express = require("express");
var app = express();
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

var mongojs = require("mongojs");
var db = mongojs("cs561003", ["applications"]);

app.get('/env', function (req, res) {
    res.json(process.env);
});

app.post("/applications", function (req, res) {
    var application = req.body;
    console.log(application);
    db.applications.insert(application, function (err, doc) { res.json(doc) });
});

app.get("/applications", function (req, res) {
    db.applications.find(function (err, docs) { res.json(docs); });
});

app.delete("/applications/:id", function (req, res) {
    db.applications.remove({ _id: mongojs.ObjectId(req.params.id) }, true, function (err, doc) {
        res.json(doc);
    });
})

app.listen(3000);

//git clone ssh://542c282ee0b8cd71ea000026@boilerplate-jga123.rhcloud.com/~/git/boilerplate.git/
