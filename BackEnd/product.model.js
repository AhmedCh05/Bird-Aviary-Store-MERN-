const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {type:String,require:true},
    price: {type:String,require:true,default:20},
    quantity : {type:String,require:true,default:10},
    category : {type:String,require:true},
    description:{type:String,require:true},
    datecreated : {type:Date,default:Date.now}
});

const product = mongoose.model('product',productSchema);

module.exports =  product;