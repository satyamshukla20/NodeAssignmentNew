const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required field'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is required field'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email.']
    },
    mobile: {
        type: Number,
    },
    password: {
        type: String,
        required: [true, 'Name is required field'],
        minlength: 8,
        select: false
    },
    roleId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    passwordChangedAt:Date
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.methods.comparePasswordInDb = async (pswd, pswdDb) => {
    return await bcrypt.compare(pswd, pswdDb)
}

const User = mongoose.model('User', userSchema)
module.exports = User