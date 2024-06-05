import mongoose from 'mongoose'

const TicketSchema = new mongoose.Schema({
    code: {
        type: String,
        require: true,
        unique: true
    },
    purchase_datetime: {
        type: Date,
        require: true,
        default: Date.now
    },
    amount: {
        type: Number,
        require: true
    },
    purchaser: {
        type: String,
        require: true
    }
},
{ 
    versionKey: false
})

const Ticket = mongoose.model('ticket', TicketSchema)

export default Ticket