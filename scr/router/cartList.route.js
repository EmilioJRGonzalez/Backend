const express = require('express')
const CartManagerMongo = require('../dao/db/managers/CartManagerMongo')

const {Router} = express
const router = new Router()

let cart = new CartManagerMongo

router.get('/:cid', async (req, res) => {
    let cid = req.params.cid

    let aux = await cart.getCartByIdTest(cid)

    //prod = {...aux}
    //const products = Object.values(prod).map(item => item.product);
    //console.log(prod[0].quantity);
    //products = {quantity : prod[0].quantity}
    //console.log({products: products})

    res.render('cart', { products: aux });
})

module.exports  = router