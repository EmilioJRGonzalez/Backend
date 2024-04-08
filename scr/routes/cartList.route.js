const express = require('express')
const CartManagerMongo = require('../controllers/CartManagerMongo')

const {Router} = express
const router = new Router()

let cart = new CartManagerMongo

router.get('/:cid', async (req, res) => {
    let cid = req.params.cid

    let aux = await cart.getCartById(cid)

    res.render('cart', { products: aux });
})

module.exports  = router