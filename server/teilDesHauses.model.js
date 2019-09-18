const mongoose = require("mongoose")

const Schema = mongoose.Schema

let Teil = new Schema({
    title: {
      type: String
    },
    description: {
      type: String
    },
    link: {
      type: String
    },
    coordinateX: {
      type: Number
    },
    coordinateY: {
      type: Number
    }
    
  },{
      collection: 'teilen'
  });

  module.exports = mongoose.model('Teil', Teil)