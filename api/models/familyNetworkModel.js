'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PeopleSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the last name of the person'
  },
  gender: {
    type: String,
    required: 'Kindly enter the gender of the person [male / female]'
  },
  imageurl: {
    type: String,
    default: ''
  },
  connections: [String],
  neighbours: [String]
});

var ConnectionsSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId
  },
  to: {
    type: Schema.Types.ObjectId
  },
  relationtype: {
    type: String,
    enum: ['husband-wife', 'son-father', 'son-mother', 'daughter-father', 'daughter-mother', 'siblings', 'unknown'],
    default: 'unknown'
  }
});

var People = mongoose.model('People', PeopleSchema);
var Connections = mongoose.model('Connections', ConnectionsSchema);

module.exports = People;
module.exports = Connections;
