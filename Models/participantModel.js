const mongoose = require('mongoose')
const validator=require('validator')

const participantSchema = new mongoose.Schema({
    "name":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email.']
    },
    "mobile":{
        type:Number,
        required:true
    },
    "address":{
        type:String
    },
    "age":{
        type:Number
    },
    "eventId":{
        type:String,
        required:true
    },
    "createdAt":{
        type:Date,
        default:Date.now()
    }
})

const Participant = mongoose.model('Participant', participantSchema)
module.exports = Participant