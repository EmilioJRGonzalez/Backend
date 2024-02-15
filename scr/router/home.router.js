const express = require('express')
const ProductManager = require('../dao/fileSystem/ProductManager')
const ProductManagerMongo = require('../dao/db/managers/ProductManagerMongo')

const {Router} = express

const router = new Router()

//let prod = new ProductManager('./scr/dao/fileSystem/data/productos.json')
let prod = new ProductManagerMongo

router.get('/', async (req, res)=> {
    let aux = await prod.getProducts()
    console.log(aux)
    res.render('home', {products: aux})
})

module.exports = router