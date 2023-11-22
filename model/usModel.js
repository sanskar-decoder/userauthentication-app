const { default: mongoose } = require("mongoose");
const plm=require('passport-local-mongoose');

const data=new mongoose.Schema({
    fullname:String,
    username:String,
    password:String,
    
    email:String,
    no:String,
    date:String,
    

},{timestamps:true});

data.plugin(plm);

module.exports=mongoose.model('fir',data);