const express = require('express')

const {Router} = express
const router = new Router()

router.get('/', (req, res) => {
    res.redirect('/view/login-view')
})

module.exports = router