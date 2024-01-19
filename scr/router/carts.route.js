const express = require('express')
const uuid4 = require('uuid4')
const ProductManager = require('../ProductManager')

const {Router} = express
const router = new Router()

let prod = new ProductManager('../scr/productos.json')

router.get('/', (req, res) => {
    res.send('<h1>Bienvenido</h1>')
})

/* router.get('/carts', async (req, res) => {
    let aux = await prod.getProducts()
    let limit = req.query.limit
    if (limit){
        aux.splice(parseInt(limit))
    }
    res.send(aux);
})

router.get('/carts/:pid', async (req, res) => {
    let pid = req.params.pid
    let aux = await prod.getProductById(pid)
    if (!aux){
        aux = {"Error": `No se encontró un producto con el id ${pid}`}
    }
    res.send(aux);
})

router.post('/createCart', async (req, res) => {

})

router.delete('/deleteProduct/:id', async (req, res) => {

})

router.put('/updateCart/:id', async (req, res) => {

}) */



module.exports  = router