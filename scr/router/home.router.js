const express = require('express')
const ProductManager = require('../ProductManager')

const {Router} = express

const router = new Router()

let prod = new ProductManager('./scr/productos.json')

router.get('/', async (req, res)=> {
    let aux = await prod.getProducts()
    res.render('home', {products: aux})
})

module.exports = router