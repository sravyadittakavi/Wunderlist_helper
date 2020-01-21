var express = require("express");
var app = express(); // define our app using express
var bodyParser = require("body-parser");
var ListController = require("./listController");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000; // set our port

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // allow these verbs
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cache-Control"
  );
  next();
};
app.use(allowCrossDomain); // plumbing it in as middleware

// middleware to use for all requests
app.use(function(req, res, next) {
  // do logging
  console.log("Middleware");
  next(); // make sure we go to the next routes and don't stop here
});

app.get("/setupNextWeek/:id", function(req, res) {
  if (req.params.id) {
    let controller = ListController();
    console.log(req.params.id);
    controller.setupNextWeek(req.params.id).then(function(x) {
      res.json(x);
    });
  } else {
    res.send("Enter previous list id");
  }
  // res.json();
});

app.post("/list/tasks", function(req, res) {
  let controller = ListController();
  console.log(req);
  controller.updateTaskInList(req.body.task, req.body.id).then(function(x) {
    res.json(x);
  });
});

app.post("/list/tasks/delete", function(req,res){
  let controller = ListController();
  console.log(req);
  controller.deleteTaskInList(req.body.task, req.body.id).then(function(x){
    res.json(x);
  });
});

app.get("/list/tasks/:id", function(req, res) {
  let controller = ListController();
  controller.getAllTasksInList(req.params.id).then(function(x) {
    res.json(x);
  });
});

app.use("/all", function(req, res) {
  let controller = ListController();
  controller.allLists().then(function(x) {
    res.send(x);
  });
});

app.use("/stats", function(req, res) {
  let controller = ListController();
  controller.getCategoryStats(req.param.id).then(function(x) {
    res.json(x);
  });
});

app.use("/", function(req, res) {
  var utils = require("./utils")();
  console.log("HERE")
  res.json(utils.getCurrentWeekListName());
});

// START THE SERVER
// =============================================================================
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
