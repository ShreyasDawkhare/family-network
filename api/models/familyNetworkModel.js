'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PeopleSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId
  },
  firstname: {
    type: String,
    required: 'Kindly enter the first name of the person'
  },
  lastname: {
    type: String,
    required: 'Kindly enter the last name of the person'
  },
  gender: {
    type: String,
    required: 'Kindly enter the gender of the person [male / female]'
  },
  label: {
    type: String,
    default: ''
  },
  imageurl: {
    type: String,
    default: ''
  }
});

var ConnectionsSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId
  },
  from: {
    type: String
  },
  to: {
    type: String
  },
  relationtype: {
    type: String,
    enum: ['husband-wife', 'son-father', 'son-mother', 'daughter-father', 'daughter-mother', 'siblings', 'unknown'],
    default: 'unknown'
  },
  color: {
      color: {
        type: String,
        enum: ['#E81123', '#00c300', '#FFB900', '#000000'],
        default: '#000000'
      }
  },
  arrow: { to: { type: Boolean, default: false }, from: { type: Boolean, default: false } },
  label: {
    type: String,
    default: ''
  }
});

var People = mongoose.model('People', PeopleSchema);
var Connections = mongoose.model('Connections', ConnectionsSchema);

module.exports = People;
module.exports = Connections;
