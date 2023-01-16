const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    productID: {type:mongoose.SchemaTypes.ObjectId,ref:'product'},
    quantity: {type:Number,require:true},
    address : {type:String,require:true,unique:false},
    phoneno : {type:Number,require:true,unique:false},
    status: {type:String, enum:["Pending","Processing","Completed","Cancelled"] , default:"Pending"},
    userID:{ type:mongoose.SchemaTypes.ObjectId,ref:'User'},
});

const Order = mongoose.model('Order',OrderSchema);

module.exports =  Order;