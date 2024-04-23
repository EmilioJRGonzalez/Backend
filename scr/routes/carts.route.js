const express = require('express')
const CONFIG = require('../config/config')
const { generateRandomValue } = require('../utils/crypto')
const transporter = require('../utils/mail')
const CartManagerMongo = require('../controllers/CartManagerMongo')
const ProductManagerMongo = require('../controllers/ProductManagerMongo')
const TicketManagerMongo = require('../controllers/TicketManagerMongo')
const html = require('../utils/plantillaMail.js')

const {Router} = express
const router = new Router()

let cart = new CartManagerMongo
let prod = new ProductManagerMongo
let tik = new TicketManagerMongo

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

router.get('/:cid/purchase', async (req, res) => {
    let cid = req.params.cid
    let cartData = await cart.getCartById(cid)

    if (typeof cartData == 'object'){

        let total = 0;
        let notPurchased = [];

        for (let item of cartData) {
            let productData = await prod.getProductById(item.product._id)
            console.log("CART", item.product.title, "PRICE", item.product.price, "CANT", item.quantity, "STOCK", productData.stock)

            if (productData.stock >= item.quantity) {
                let body = {stock: productData.stock -= item.quantity};
                //let body = {stock: 15};
                let a = await prod.updateProduct(item.product._id, body)
                total += item.product.price * item.quantity;
                let b = await cart.deleteProductFromCart(cid, item.product._id.toString())
            } else {
                notPurchased.push(item.product._id);
            } 
        }

        //console.log (notPurchased, generateRandomValue(10), total, req.session.email)
        let code = generateRandomValue(10)

        let title = total === 0 ? 'Lo sentimos: no fue posible efectuar su compra' : 'Compra realizada correctamente'
        let detail = notPurchased.length === 0 ? '' : `\n\n Los siguientes productos NO tienen stock suficiente:\n ${notPurchased.join(', ')}`;
                
        if (total > 0){
            let c = await tik.addTicket({code, amount: total, purchaser: req.session.email})
            console.log(c)

            let  fechaHora = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
            let correoHTML = html
            .replace("{{code}}", code)
            .replace("{{purchase_datetime}}", fechaHora)
            .replace("{{amount}}", total.toFixed(2));

            let mensaje = await transporter.sendMail({
                from: `Ecommerce test ${CONFIG.MAIL_USER}`,
                to:req.session.email,
                subject:'CODERHOUSE: Confirmacion de compra',
                text:'Test!',
                html: correoHTML
            })
            if(!!mensaje.messageId){
                console.log('email enviado', mensaje.messageId)
            }
        }

        res.send({data:cartData, message: title + detail})
    }else{
        res.send({data:[], message: 'El carrito esta vacío'})
    }
})

module.exports  = router