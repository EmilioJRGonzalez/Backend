const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    user_type: {
        type: String,
        require: true,
        enum: ['admin', 'usuario'],
        default: 'usuario'
    }
}, { versionKey: false })

const User = mongoose.model('user', UserSchema)

module.exports = User