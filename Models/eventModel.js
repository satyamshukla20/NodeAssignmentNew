const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        unique: true,
        required:true
    },
    contactMobile: {
        type: Number,
        required:true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    venueAddress: {
        type: String,
        required:true
    },
    maxEntryPerRegistration: {
        type: Number,
        default:1000
    },
    RegistrationStatus: {
        type: String,
    },
    UserId: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
})

const Event = mongoose.model('Event', eventSchema);
module.exports=Event
