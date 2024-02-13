const express = require('express')
const Products = require('../dao/db/models/product.model')

const {Router} = express
const router = new Router()

router.get('/', async (req, res) => {
    let limit = req.query.limit
    try{
        let resp = await Products.find().limit(parseInt(limit));
        res.send({
            msg: resp == null ? 'No se encontraron productos' : 'Productos encontrados',
            data: resp
        })
    }catch(err){
        console.log(err)
    }
})

router.get('/:pid', async (req, res) => {
    let pid = req.params.pid

    try{
        let resp = await Products.findOne({_id: pid})
        res.send({
            msg: resp == null ? 'Producto no encontrado' : 'Producto encontrado',
            data: resp
        })
    }catch(err){
        console.log(err)
    }
})

router.post('/', async (req, res) => {
    try{
        await Products.create(req.body)
        res.status(201).send({
            msg: 'Producto guardado',
            data: req.body
        })

    }catch(err){
        console.log(err)
        res.send({
            error: err
        })
    }
})

router.delete('/:id', async (req, res) => {
    let id = req.params.id
    aux = `Error: No se encontró un producto con el id ${id}`

    try{
        let resp = await Products.deleteOne({_id: id})
        if (resp.deletedCount === 1){
            aux = `El producto con el id ${id} fue eliminado correctamente`
        }
        res.send({
            data: [],
            msg: aux
        })
    }catch(err){
        console.log(err)
        res.send({
            error: err
        })
    }
})

router.put('/:id', async (req, res) => {
    let id = req.params.id
    let body = req.body

    try{
        const update = {
            ...(body.title !== undefined && {title: body.title}),
            ...(body.description !== undefined && { description: body.description }),
            ...(body.price !== undefined && { price: body.price }),
            ...(body.thumbnail !== undefined && { thumbnail: body.thumbnail }),
            ...(body.code !== undefined && { code: body.code }),
            ...(body.stock !== undefined && { stock: body.stock }),
            ...(body.category !== undefined && { category: body.category })
        };

        const resp = await Products.updateOne({_id: id}, update);

        res.send({
            msg: resp.matchedCount === 1 ? `El producto con el codigo ${id} fue actualizado` : `Error: No se encontró un producto con el codigo ${id}`,
            data: req.body
        })
    }catch(err){
        console.log(err)
        res.send({
            error: err
        })
    }

})


module.exports = router


