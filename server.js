var express = require('express'),
  app = express(),
  port = process.env.PORT || 2911,
  mongoose = require('mongoose'),
  Task = require('./api/models/familyNetworkModel'), //created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/familynetwork');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("static/"));

var routes = require('./api/routes/familyNetworkRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('family network RESTful API server started on: ' + port);
