const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    products: {
        type: Array
    }
}, { versionKey: false })

const Cart = mongoose.model('cart', CartSchema)

module.exports = Cart