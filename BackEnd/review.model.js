const mongoose = require('mongoose');

const reviewSchema  = new mongoose.Schema({
    id:{type:mongoose.SchemaTypes.ObjectId},
    author: {type:String},
    reviewContent: {type:String,require:true},
    date: {type:Date,default:Date.now},
    rating: {type: Number, min: 1.0, max: 5.0}
  });


const myreview = mongoose.model('myreview',reviewSchema);

exports.module = myreview;
