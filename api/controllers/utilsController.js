'use strict';


var mongoose = require('mongoose');


exports.getColorRelation = function(){
  return {
    'husband-wife': "#E81123",
    'son-father': "#00c300",
    'son-mother':"#00c300",
    'daughter-father':"#00c300",
    'daughter-mother':"#00c300",
    'siblings':"#FFB900"
  };
};
exports.getArrowforRelation = function(relationship){
  switch(relationship) {
    case 'husband-wife': return {to:false,from:false};
    case 'son-father': return {to:true,from:false};
    case 'son-mother': return {to:true,from:false};
    case 'daughter-father': return {to:true,from:false};
    case 'daughter-mother': return {to:true,from:false};
    case 'siblings': return {to:false,from:false};
  }
};
