const express = require('express')
const CartManagerMongo = require('../models/db/managers/CartManagerMongo')

const {Router} = express
const router = new Router()

let cart = new CartManagerMongo

router.get('/:cid', async (req, res) => {
    let cid = req.params.cid

    let aux = await cart.getCartByIdTest(cid)

    res.render('cart', { products: aux });
})

module.exports  = router