const mongoose = require("mongoose")

const Schema = mongoose.Schema

let Chart = new Schema({
  Chart: {
    type : Object
  }
  
  
  
    
  },{
      collection: 'chart',
      autoIndexId: false
  });

  module.exports = mongoose.model('Chart', Chart)