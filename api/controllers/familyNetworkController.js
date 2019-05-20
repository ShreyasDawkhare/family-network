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
            gender: 1,
            label : '$firstname' ,
            firstname: '$firstname',
            lastname : '$lastname',
            image: '$imageurl',
            connections: 1,
            neighbours: 1
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
              id: '$_id',
              from: 1,
              to: 1,
              relationtype: 1
            }
        }
      ], function (err, obj) {
        if (err)
          errors.push(err);
        edges = edges.concat(obj);
        var color_map = getColorRelation();
        for(var i=0; i<edges.length; i++){
          edges[i].color = {color: color_map[edges[i].relationtype]};
          edges[i].arrows = getArrowforRelation(edges[i].relationtype);
        }
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

exports.search_autocomplete = function(req, res) {
  People.aggregate([
    {
      $match: {  'name': { $regex: req.query.term, $options: 'i'}  },
    },
    {
      $project:{
        _id:0,
        id: "$_id",
        label: '$name',
        value: '$name'
      }
    }
  ], function (err, obj) {
    if (err)
      res.send(err);
    res.json(obj);
  });
};

var getColorRelation = function(){
  return {
    'husband-wife': "#E81123",
    'son-father': "#00c300",
    'son-mother':"#00c300",
    'daughter-father':"#00c300",
    'daughter-mother':"#00c300",
    'siblings':"#FFB900"
  };
};
var getArrowforRelation = function(relationship){
  switch(relationship) {
    case 'husband-wife': return {to:false,from:false};
    case 'son-father': return {to:true,from:false};
    case 'son-mother': return {to:true,from:false};
    case 'daughter-father': return {to:true,from:false};
    case 'daughter-mother': return {to:true,from:false};
    case 'siblings': return {to:false,from:false};
  }
};
