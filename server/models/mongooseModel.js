const mongoose=require('mongoose')
const Schema=mongoose.Schema


const fileHistorySchema=new Schema({
    userEmail: String,
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: String,
    location: String
},{timestamps:true})

exports.FileHistory=new mongoose.model('FileHistory',fileHistorySchema)
