const express = require('express')
const authII = require('../middleware/auth')
const ProductManager = require('../models/fileSystem/ProductManager')
const ProductManagerMongo = require('../controllers/ProductManagerMongo')

const {Router} = express

const router = new Router()

//let prod = new ProductManager('./scr/models/fileSystem/data/productos.json')
let prod = new ProductManagerMongo

router.get('/', authII, async (req, res)=> {
    let limit = 100
    let page = 1
    let sort = 1
    let filter
    let aux = await prod.getProducts(limit, page, sort, filter)
    res.render('realTimeProducts', {products: aux.payload})
})

module.exports = router