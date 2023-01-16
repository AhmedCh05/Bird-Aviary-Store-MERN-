const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
    userid: {type:mongoose.SchemaTypes.ObjectId,ref:'user'},
    name:{type:String,require:true},
    email: {type:String,require:true},
    message : {type:String,require:true,unique:false},
    
});

const contact = mongoose.model('contact',contactSchema);

module.exports =  contact;