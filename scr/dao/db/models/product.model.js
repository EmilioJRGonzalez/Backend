const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    thumbnail: {
        type: Array,
        require: true
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    stock: {
        type: Number,
        default: 10
    },
    status: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        require: true,
        enum: ['Categoria 1', 'Categoria 2', 'Categoria 3']
    }
})

const Product = mongoose.model('product', ProductSchema)

module.exports = Product