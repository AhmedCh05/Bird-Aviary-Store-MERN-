const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fname: {type:String,require:true},
    lname: {type:String,require:true},
    email : {type:String,require:true,unique:true},
    password:{type:String,require:true},
    phoneno : {type:Number,require:true,unique:true},
});

const User = mongoose.model('User',UserSchema);

module.exports =  User;