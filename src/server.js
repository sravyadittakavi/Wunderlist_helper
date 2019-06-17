var express = require("express");
var app = express(); // define our app using express
var bodyParser = require("body-parser");
var ListController = require("./listController");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; // set our port

// middleware to use for all requests
app.use(function(req, res, next) {
  // do logging
  console.log("Middleware");
  next(); // make sure we go to the next routes and don't stop here
});

app.use("/setupNextWeek", function(req, res) {
  let controller = ListController();
  controller.setupNextWeek().then(function(x) {
    res.json(x);
  });
  // res.json();
});

app.use("/stats", function(req, res) {
  let controller = ListController();
  controller.getCategoryStats(req.param.id).then(function(x) {
    res.json(x);
  });
});

app.use("/", function(req, res) {
  var utils = require("./utils")();
  res.json(utils.getCurrentWeekListName());
});

// START THE SERVER
// =============================================================================
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
