'use strict';


var mongoose = require('mongoose'),
  People = mongoose.model('People'),
  Connections = mongoose.model('Connections');

/*
* People CRUD operations
*
*/

// RETRIEVE ALL
exports.list_all_people = function(req, res) {
  People.find({}, function(err, obj) {
    if (err)
      res.send(err);
    res.json(obj);
  });
};

// CREATE
exports.create_a_person = function(req, res) {
  var new_person = new People(req.body);
  new_person.save(function(err, obj) {
    if (err)
      res.send(err);
    res.json(obj);
  });
};

// RETRIEVE
exports.read_a_person = function(req, res) {
  People.findById(req.params.personId, function(err, obj) {
    if (err)
      res.send(err);
    res.json(obj);
  });
};

// UPDATE
exports.update_a_person = function(req, res) {
  People.findOneAndUpdate({_id: req.params.personId}, req.body, {new: true}, function(err, obj) {
    if (err)
      res.send(err);
    res.json(obj);
  });
};

// DELETE
exports.delete_a_person = function(req, res) {
  People.remove({
    _id: req.params.personId
  }, function(err, obj) {
    if (err)
      res.send(err);
    res.json({ object: obj, message: 'Perosn successfully deleted' });
  });
};

/*
* Connections CRUD operations
*
*/

// RETRIEVE ALL
exports.list_all_connections = function(req, res) {
  Connections.find({}, function(err, obj) {
    if (err)
      res.send(err);
    res.json(obj);
  });
};

// CREATE
exports.create_a_connection = function(req, res) {
  var new_connection = new Connections(req.body);
  new_connection.save(function(err, obj) {
    if (err)
      res.send(err);
    res.json(obj);
  });
};

// RETRIEVE
exports.read_a_connection = function(req, res) {
  Connections.findById(req.params.connectionId, function(err, obj) {
    if (err)
      res.send(err);
    res.json(obj);
  });
};

// UPDATE
exports.update_a_connection = function(req, res) {
  Connections.findOneAndUpdate({_id: req.params.connectionId}, req.body, {new: true}, function(err, obj) {
    if (err)
      res.send(err);
    res.json(obj);
  });
};

// DELETE
exports.delete_a_connection = function(req, res) {
  Connections.remove({
    _id: req.params.connectionId
  }, function(err, obj) {
    if (err)
      res.send(err);
    res.json({ object: obj, message: 'Connection successfully deleted' });
  });
};
