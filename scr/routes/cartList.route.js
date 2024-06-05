import express from 'express'
import CartManagerMongo from '../controllers/CartManagerMongo.js'

const router = express.Router()

router.get('/:cid', async (req, res) => {
    let cart = new CartManagerMongo(req.logger)
    let cid = req.params.cid

    let aux = await cart.getCartById(cid)

    res.render('cart', { products: aux, cartID: cid });
})

export default router;
