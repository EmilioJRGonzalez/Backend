const express = require('express')
const uuid4 = require('uuid4')
const ProductManager = require('../dao/fileSystem/ProductManager')
const ProductManagerMongo = require('../dao/db/managers/ProductManagerMongo')

const {Router} = express
const router = new Router()

//let prod = new ProductManager('./scr/dao/fileSystem/data/productos.json')
let prod = new ProductManagerMongo

router.get('/', async (req, res) => {
    let aux = await prod.getProducts()
    let limit = req.query.limit
    if (limit){
        aux.splice(parseInt(limit))
    }
    res.send(aux);
})

router.get('/:pid', async (req, res) => {
    let pid = req.params.pid
    let aux = await prod.getProductById(pid)
    if (!aux){
        aux = {"Error": `No se encontró un producto con el id ${pid}`}
    }
    res.send(aux);
})

router.post('/', async (req, res) => {
    let body = req.body

    let aux = await prod.addProduct(body)
    if (aux.length >0){
        msg = aux;
    }
    res.send({data:[], message: aux})
})

router.delete('/:id', async (req, res) => {
    console.log(req.params)
    let id = req.params.id

    let aux = await prod.deleteProduct(id)
    console.log(aux)

    res.send({data:[], message: aux})
})

router.put('/:id', async (req, res) => {
    let id = req.params.id
    let body = req.body

    let aux = await prod.updateProduct(id, body)

    res.send({data:[], message: aux})

})


module.exports  = router