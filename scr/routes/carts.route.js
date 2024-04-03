const express = require('express')
const CartManagerMongo = require('../models/db/managers/CartManagerMongo')

const {Router} = express
const router = new Router()

let cart = new CartManagerMongo

router.get('/:cid', async (req, res) => {
    let cid = req.params.cid
    let aux = await cart.getCartById(cid)
    console.log(typeof aux)
    if (typeof aux == 'object'){
        res.send({data:aux, message: ''})
    }else{
        res.send({data:[], message: aux})
    }
})

router.post('/', async (req, res) => {
    let aux = await cart.createCart()
    aux = `Se creó el carrito con id ${aux}`
    res.send({data:[], message: aux})
})

router.post('/:cid/product/:pid', async (req, res) => {
    let cid = req.params.cid
    let pid = req.params.pid

    let aux = await cart.addProductToCart(cid, pid)
    res.send({data:[], message: aux})
})

router.delete('/:cid/product/:pid', async (req, res) => {
    let cid = req.params.cid
    let pid = req.params.pid

    let aux = await cart.deleteProductFromCart(cid, pid)
    res.send({data:[], message: aux})
})

router.put('/:cid', async (req, res) => {
    let cid = req.params.cid
    let body = req.body

    let aux = await cart.updateCartProducts(cid, body)
    res.send({data:[], message: aux})
})

router.put('/:cid/products/:pid', async (req, res) => {
    let cid = req.params.cid
    let pid = req.params.pid
    let quantity = req.body.quantity

    let aux = await cart.updateQuantity(cid, pid, quantity)
    res.send({data:[], message: aux})
})

router.delete('/:cid', async (req, res) => {
    let cid = req.params.cid

    let aux = await cart.clearCart(cid)
    res.send({data:[], message: aux})
})

module.exports  = router