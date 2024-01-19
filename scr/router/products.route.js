const express = require('express')
const uuid4 = require('uuid4')
const ProductManager = require('../ProductManager')

const {Router} = express

const router = new Router()

let prod = new ProductManager('./scr/productos.json')

/* router.get('/', (req, res) => {
    res.send('<h1>Bienvenido</h1>')
}) */

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
    let id = uuid4()
    let msg = 'Producto guardado'

    let title = req.body.title
    let description = req.body.description
    let price = req.body.price
    let thumbnail = req.body.thumbnail
    let code = req.body.code
    let stock = req.body.stock
    let status = true
    let category = req.body.category

    let aux = await prod.addProduct(id, title, description, price, thumbnail, code, stock, status, category)
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
    let id = req.body.id
    let title = req.body.title
    let description = req.body.description
    let price = req.body.price
    let thumbnail = req.body.thumbnail
    let code = req.body.code
    let stock = req.body.stock
    let status = true
    let category = req.body.category

    let aux = await prod.updateProduct(id, title, description, price, thumbnail, code, stock, status, category)

    res.send({data:[], message: aux})

})


module.exports  = router