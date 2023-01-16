const mongoose = require('mongoose');

const registerSchema  = new mongoose.Schema({
    id:{type:mongoose.SchemaTypes.ObjectId},
    email: {type:String,require:true,unique:true},
    password: {type:String,require:true},
    date: {type:Date,default:Date.now},
  });


const Register = mongoose.model('Register',registerSchema);

module.exports = Register;
