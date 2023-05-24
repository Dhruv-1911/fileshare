const mongoose = require("mongoose");

//create a Admin database
const fileSchema = mongoose.Schema({
    filename: {type:String , required:true},
    path :{type:String, required:true},
    size:{type:Number ,required: true},
    uuid:{type:String, required:true},
    sender:{type:String, required:false},
    receiver:{type:String, required:false}
},{timestamos:true});

module.exports=mongoose.model('file',fileSchema)