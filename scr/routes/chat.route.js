const express = require('express')
const authII = require('../middleware/auth')

const {Router} = express

const router = new Router()

router.get('/', authII, (req, res)=>{
    console.log("inside chat")
    res.render('chat', {})
})

module.exports = router