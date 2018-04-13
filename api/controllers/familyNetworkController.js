'use strict';


var mongoose = require('mongoose'),
  People = mongoose.model('People'),
  Connections = mongoose.model('Connections');

const ObjectId = mongoose.Types.ObjectId;


exports.list_all = function(req, res) {
  var nodes =[];
  var edges =[];
  var errors =[];
  People.aggregate([
      {
          $project: {
            _id: 0,
            id: '$_id',
            label: { $concat: [ '$firstname', " ", '$lastname' ] },
            image: '$imageurl'
          }
      }
    ], function (err, obj) {
      if (err)
        errors.push(err);
      nodes = nodes.concat(obj);
      Connections.aggregate([
          {
              $project: {
                _id: 0,
                from: 1,
                to: 1,
                color: 1,
                arrows: '$arrow'
              }
          }
      ], function (err, obj) {
        if (err)
          errors.push(err);
        edges = edges.concat(obj);
        if (errors.length != 0){
          res.send(errors);
        } else {
          res.json({
                    nodes: nodes,
                    edges: edges
                  });
        }
      });
    });
};

/*
* People CRUD operations
*
*/

// RETRIEVE ALL
exports.list_all_people = function(req, res) {
  People.aggregate([
      {
          $project: {
            _id: 0,
            id: '$_id',
            label: { $concat: [ '$firstname', " ", '$lastname' ] },
            image: '$imageurl'
          }
      }
  ], function (err, obj) {
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
  People.aggregate([
    {
        $match : {
          _id : ObjectId(req.params.personId)
        }
    },
    {
        $project: {
          _id: 0,
          id: '$_id',
          label: { $concat: [ '$firstname', " ", '$lastname' ] },
          image: '$imageurl'
        }
    }
  ], function (err, obj) {
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
  Connections.aggregate([
      {
          $project: {
            _id: 0,
            from: 1,
            to: 1,
            color: 1,
            arrows: '$arrow'
          }
      }
  ], function (err, obj) {
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
