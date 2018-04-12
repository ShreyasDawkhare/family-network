'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PeopleSchema = new Schema({
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
  from: {
    type: String
  },
  to: {
    type: String
  },
  relationtype: {
    type: [{
      type: String,
      enum: ['husband-wife', 'son-father', 'son-mother', 'daughter-father', 'daughter-mother', 'brother-sister', 'unknown']
    }],
    default: 'unknown'
  },
  color: {
      color: {
        type: [{
          type: String,
          enum: ['#E81123', '#00c300', '#FFB900', '#000000']
        }],
        default: '#000000'
      }
  },
  arrow: { to: { type: Boolean, default: false }, from: { type: Boolean, default: false } },
  label: {
    type: String,
    default: ''
  },
});

module.exports = mongoose.model('People', PeopleSchema);
module.exports = mongoose.model('Connections', ConnectionsSchema);
