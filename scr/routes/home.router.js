import express from 'express'
import ProductManager from '../models/fileSystem/ProductManager.js'
import ProductManagerMongo from '../controllers/ProductManagerMongo.js'

const { Router } = express
const router = new Router()

//let prod = new ProductManager('./scr/models/fileSystem/data/productos.json')
let prod = new ProductManagerMongo

router.get('/', async (req, res)=> {
    let limit = 10
    let page = 1
    let sort = 1
    let filter
    let aux = await prod.getProducts(limit, page, sort, filter)
    res.render('home', {products: aux.payload})
})

export default router