const express = require('express')
const ProductManager = require('../dao/fileSystem/ProductManager')

const {Router} = express

const router = new Router()

let prod = new ProductManager('./scr/dao/fileSystem/data/productos.json')

router.get('/', async (req, res)=> {
    let aux = await prod.getProducts()
    res.render('home', {products: aux})
})

module.exports = router