const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Name is required field']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})


const Roles = mongoose.model('Roles', rolesSchema)
Roles.create()
module.exports = Roles