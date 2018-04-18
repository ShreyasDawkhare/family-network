'use strict';

var mongoose = require('mongoose'),
  People = mongoose.model('People');
var connectionsController = require('./ConnectionsController');
var peopleController = require('./PeopleController');

const ObjectId = mongoose.Types.ObjectId;

/*
* People CRUD operations
*
*/

// RETRIEVE ALL
exports.list_all_people = function(req, res) {
  /*People.aggregate([
      {
        $project:{
          _id:0,
          id: "$_id",
          name: 1,
          gender: 1,
          imageurl:1
        }
      }
  ], */
  People.find({},
  function (err, obj) {
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
    console.log("Person creatred");
  });
};

// RETRIEVE
exports.read_a_person = function(req, res) {
  People.aggregate([
    {
        $match : {
          _id : ObjectId(req.params.personId)
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
  peopleController.deletePerson(req.params.personId,function(error, returnObj){
    if(error){
      res.send(error);
    }
    res.json(returnObj);
  });
};

exports.deletePerson = function(personId,callback) {
  var error;
  var returnObj;
  People.findById(personId, function(err, obj) {
    error = err;
    if(!err){
      for(var i=0;i<obj.connections.length;i++){
        connectionsController.deleteConnection(obj.connections[i],function(error, returnObj){
        });
      }
      People.remove({
        _id: personId
      }, function(err, obj) {
        if (err)
          error = err;
        returnObj = { object: obj, message: 'Person successfully deleted' };
        callback(error, returnObj);
      });
    }
  });
};
/*
* Table
*
*/

exports.table_update_person = function(req, res) {
  if(req.body.action == 'edit'){
    var id = req.body.id;
    delete req.body.action;
    delete req.body.id;
    People.findOneAndUpdate({_id: id}, req.body, {new: true}, function(err, obj) {
      if (err)
        res.send(err);
      res.json(obj);
    });
  } else if(req.body.action == 'delete') {
    peopleController.deletePerson(req.body.id,function(error, returnObj){
      if(error){
        res.send(error);
      }
      res.json(returnObj);
    });
  } else {
    res.send({error:'Error'});
  }

};
