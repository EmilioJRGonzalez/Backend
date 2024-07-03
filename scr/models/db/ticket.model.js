import mongoose from 'mongoose'

const TicketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    purchase_datetime: {
        type: Date,
        required: true,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
},
{ 
    versionKey: false
})

const Ticket = mongoose.model('ticket', TicketSchema)

export default Ticket