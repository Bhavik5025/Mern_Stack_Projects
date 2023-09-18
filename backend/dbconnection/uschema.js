const mongoose=require('mongoose');
const udetails=mongoose.Schema({
    uname:String,
    email:String,
    password:String
});
module.exports=mongoose.model("userinfo",udetails);