const express = require('express')

const {Router} = express

const router = new Router()

router.get('/', (req, res)=>{
    console.log("inside chat")
    res.render('chat', {})
})

module.exports = router