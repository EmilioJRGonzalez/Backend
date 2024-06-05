import express from 'express'
import { generateProducts } from '../utils/mock.js'

const router = express.Router()

router.get('/', async (req, res) => {
    let aux = generateProducts()
    res.send({data:aux, message: ''})
})

export default router