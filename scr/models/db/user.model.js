import mongoose from 'mongoose'

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