const express = require('express')
const { generateProducts } = require('../utils/mock')

const {Router} = express
const router = new Router()

router.get('/', async (req, res) => {
    let aux = generateProducts()
    res.send({data:aux, message: ''})
})

module.exports  = router