const express = require('express')
const uuid4 = require('uuid4')
const CartManager = require('../CartManager')

const {Router} = express
const router = new Router()

let cart = new CartManager('./scr/carrito.json')

/* router.get('/', (req, res) => {
    res.send('<h1>Bienvenido</h1>')
}) */

router.get('/:cid', async (req, res) => {
    let cid = req.params.cid
    let aux = await cart.getCartById(cid)
    if (typeof aux == 'object'){
        res.send({data:aux, message: ''})
    }else{
        res.send({data:[], message: aux})
    }
})

router.post('/', async (req, res) => {

    let id = uuid4()
    let aux = await cart.createCart(id)
    res.send({data:[], message: aux})
})

router.post('/:cid/product/:pid', async (req, res) => {
    let cid = req.params.cid
    let pid = req.params.pid

    let aux = await cart.addProductToCart(cid, pid)
    res.send({data:[], message: aux})
})


module.exports  = router