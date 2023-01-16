const mongoose = require("mongoose");
const myuser = require('./user.model');

const cartSchema = new mongoose.Schema(
  {
    userID: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    products: [{productId: Number,quantity: Number,name: String,price: Number}],
    active: {type: Boolean,default: true},
    modifiedOn: {type: Date,default: Date.now}
});

const mycart = mongoose.model('mycart',cartSchema);

exports.module = mycart;
