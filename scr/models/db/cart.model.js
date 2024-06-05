import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
}, { versionKey: false })

const Cart = mongoose.model('cart', CartSchema)

export default Cart
