const express = require('express')
const ProductManager = require('../dao/fileSystem/ProductManager')
const ProductManagerMongo = require('../dao/db/managers/ProductManagerMongo')

const {Router} = express

const router = new Router()

//let prod = new ProductManager('./scr/dao/fileSystem/data/productos.json')
let prod = new ProductManagerMongo

router.get('/', async (req, res)=> {
    let limit = 10
    let page = 1
    let sort = 1
    let filter
    let aux = await prod.getProducts(limit, page, sort, filter)
    res.render('realTimeProducts', {products: aux.payload})
})

module.exports = router