import express from 'express'
import authII from '../middleware/auth.js'
import ProductManagerMongo from '../controllers/ProductManagerMongo.js'

const router = express.Router()
const prod = new ProductManagerMongo()

router.get('/', authII, async (req, res) => {
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

    const arrPages = [];
    // Genero un array con todas las paginas
    for (let i = 1; i <= aux.totalPages; i++) {
        arrPages.push(i);
    }

    res.render('products', { products: aux.payload, totalPages: aux.totalPages, prevPage: aux.prevPage, nextPage: aux.nextPage, page: aux.page, pages: arrPages, session: req.session});
})

export default router