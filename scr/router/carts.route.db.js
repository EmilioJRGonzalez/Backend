const express = require('express')
const Carts = require('../dao/db/models/cart.model')
const CartManager = require('../dao/fileSystem/CartManager')

const {Router} = express
const router = new Router()

let cart = new CartManager('./scr/dao/fileSystem/data/carrito.json')

router.get('/:cid', async (req, res) => {
    let cid = req.params.cid

    try{
        let resp = await Carts.findOne({_id: cid})
        res.send({
            msg: resp == null ? 'Carrito no encontrado' : 'Carrito encontrado',
            data: resp
        })
    }catch(err){
        console.log(err)
    }
})

router.post('/', async (req, res) => {
    try{
        let resp = await Carts.create({products: []})
        console.log(resp)
        res.status(201).send({
            msg: 'Carrito creado',
            data: resp
        })

    }catch(err){
        console.log(err)
        res.send({
            error: err
        })
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    let cid = req.params.cid
    let pid = req.params.pid
    let aux = ''
    let respC = ''

    try{
        respC = await Carts.findOne({_id: cid})
        if (respC == null) {
            aux = 'Carrito no encontrado'
        }else{
            const index = respC.products.findIndex(item => item.product == pid);
            let prodToUpdate
            if (index === -1) {
                prodToUpdate = [ ...respC.products, 
                                {product: pid, quantity: 1}
                            ]
            }else{
                respC.products[index].quantity += 1;
                prodToUpdate = respC.products
            }

            const resp = await Carts.updateOne({_id: cid}, {products: prodToUpdate})
            aux = `Carrito ${cid} con producto ${pid} actualizado`
        }
        res.send({
            msg: aux,
            data: []
        })
    }catch(err){
        console.log(err)
        res.send({
            error: err
        })
    }
})


module.exports  = router