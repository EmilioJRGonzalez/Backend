const express = require('express')
const CartManagerMongo = require('../controllers/CartManagerMongo')

const {Router} = express
const router = new Router()

router.get('/:cid', async (req, res) => {
    let cart = new CartManagerMongo(req.logger)
    let cid = req.params.cid

    let aux = await cart.getCartById(cid)

    res.render('cart', { products: aux, cartID: cid });
})

module.exports  = router