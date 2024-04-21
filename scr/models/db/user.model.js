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
    age: {
        type: Number
    },
    password: {
        type: String,
        require: true
    },    
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart"
    },
    role: {
        type: String,
        require: true,
        enum: ['admin', 'user'],
        default: 'user'
    }
},
{ 
    timestamps: true,
    versionKey: false
})

const User = mongoose.model('user', UserSchema)

module.exports = User