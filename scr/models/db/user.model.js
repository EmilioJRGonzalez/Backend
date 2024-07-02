import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },    
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart"
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user', 'premium'],
        default: 'user'
    },
    documents: [{
        name: {
            type: String,
            required: true
        },
        reference: {
            type: String,
            required: true
        }
    }],
    last_connection: {
        type: Date,
        default: Date.now
    }
},
{ 
    timestamps: true,
    versionKey: false
})

const User = mongoose.model('user', UserSchema)

export default User