import express from 'express'
import ProductManagerMongo from '../controllers/ProductManagerMongo.js'
import errorHandler from '../middleware/errHandler.js'

const router = express.Router()

router.get('/', async (req, res) => {
    let prod = new ProductManagerMongo(req.logger)
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let sort = (req.query.sort === '1' || req.query.sort === '-1') ? parseInt(req.query.sort) : 1;
    let query = req.query.query
    let filter

    if (query) {
        let parts = query.split(":");   
        filter = {
            [parts[0]]: parts[1]
        };
    }

    let aux = await prod.getProducts(limit, page, sort, filter)
    res.send(aux);
})

router.get('/:pid', async (req, res) => {
    let prod = new ProductManagerMongo(req.logger)
    let pid = req.params.pid
    let aux = await prod.getProductById(pid)
    if (!aux){
        aux = {"Error": `No se encontró un producto con el id ${pid}`}
    }
    res.send(aux);
})

router.post('/', async (req, res) => {
    let prod = new ProductManagerMongo(req.logger)
    let body = req.body
    let s = 200

    let aux = await prod.addProduct(body)
    if (aux.toUpperCase().includes('ERROR')){
        s = 400
    }
    res.status(s).send({data:[], message: aux})
})

router.delete('/:id', async (req, res) => {
    let prod = new ProductManagerMongo(req.logger)
    req.logger.debug(req.params)
    let id = req.params.id
    let user = req.body.user
    let s = 200

    let aux = await prod.deleteProduct(id, user)
    console.log(aux)
    if (aux.toUpperCase().includes('ERROR')){
        s = 400
    }

    res.status(s).send({data:[], message: aux})
})

router.put('/:id', async (req, res) => {
    let prod = new ProductManagerMongo(req.logger)
    let id = req.params.id
    let body = req.body

    let aux = await prod.updateProduct(id, body)

    res.send({data:[], message: aux})

})

router.use(errorHandler)

export default router