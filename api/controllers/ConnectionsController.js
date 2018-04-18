'use strict';


var mongoose = require('mongoose'),
  Connections = mongoose.model('Connections'),
  People = mongoose.model('People');
var connectionsController = require('./ConnectionsController');
var utilsController = require('./utilsController');

const ObjectId = mongoose.Types.ObjectId;

/*
* Connections CRUD operations
*
*/

// RETRIEVE ALL
exports.list_all_connections = function(req, res) {
  Connections.find({}, function (err, obj) {
    if (err)
      res.send(err);
    res.json(obj);
  });
};

// CREATE
exports.create_a_connection = function(req, res) {
  var new_connection = new Connections(req.body);
  Connections.find({from:req.body.from ,to:req.body.to}).then(function(obj){
    if (obj.length){
      res.send({error:'Connection Already exists'});
    } else {
      new_connection.save().then(function(cobj) {
        People.findById(req.body.from, function(err, pobj) {
          if (err){
            res.send(err);
          } else if(pobj){
            pobj.connections.push(cobj._id.toString());
            pobj.neighbours.push(cobj.to);
            pobj.save(function (err, person) {
              if (err){
                res.send(err);
              }
            });
          }
        });
        People.findById(req.body.to, function(err, pobj) {
          if (err){
            res.send(err);
          } else if(pobj){
            pobj.connections.push(cobj._id.toString());
            pobj.neighbours.push(cobj.from);
            pobj.save(function (err, person) {
              if (err){
                res.send(err);
              }
            });
          }
        });
        res.json(cobj);
      });
    }
  });
};

// RETRIEVE
exports.read_a_connection = function(req, res) {
  Connections.findById(req.params.connectionId, function(err, obj) {
    if (err)
      res.send(err);

    obj = obj.toObject();
    var color_map = utilsController.getColorRelation();
    obj.color = {color: color_map[obj.relationtype]};
    obj.arrows = utilsController.getArrowforRelation(obj.relationtype);
    res.json(obj);
  });
};

// DELETE
exports.delete_a_connection = function(req, res) {
  connectionsController.deleteConnection(req.params.connectionId, function(error, returnObj){
    if(error){
      res.send(error);
    }
    res.json(returnObj);
  });

};
exports.deleteConnection = function(connectionId, callback) {
  var error;
  var returnObj;
  Connections.findById(connectionId, function(err, cobj) {
    error = err;
    Connections.remove({
      _id: connectionId
    }, function(err, obj) {
      error = err;
      People.findById(cobj.from, function(err, pobj) {
        error = err;
        if(!err && pobj){
          pobj.connections = pobj.connections.filter(function( str ) {
            return str !== connectionId;
          });
          pobj.neighbours = pobj.neighbours.filter(function( str ) {
            return str !== cobj.to.toString();
          });
          pobj.save(function (err, person) {
            error = err;
          });
        }
      });
      People.findById(cobj.to, function(err, pobj) {
        error = err;
        console.log(err);
        if(!err && pobj){
          console.log(pobj);
          pobj.connections = pobj.connections.filter(function( str ) {
            return str !== connectionId;
          });
          pobj.neighbours = pobj.neighbours.filter(function( str ) {
            return str !== cobj.from.toString();
          });
          pobj.save(function (err, person) {
            error = err;
          });
        }
      });
      returnObj = { object: obj, message: 'Connection successfully deleted' };
      callback(error, returnObj);
    });
  });
};


/*
* Table
*
*/

exports.table_update_connection = function(req, res) {
  if(req.body.action == 'edit'){
    res.send({error:'Update is disabled'});
  } else if(req.body.action == 'delete') {
    connectionsController.deleteConnection(req.body.id, function(error, returnObj){
      if(error){
        res.send(error);
      }
      res.json(returnObj);
    });
  } else {
    res.send({error:'Error'});
  }

};
