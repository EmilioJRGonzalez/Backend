const express = require('express')
const authII = require('../middleware/auth')

const {Router} = express
const router = new Router()

router.get('/login-view', (req, res) => {
    res.render('login')
})

router.get('/register-view', (req, res) => {
    res.render('register')
})

router.get('/profile-view', authII, (req, res) => {
    res.render('profile', {session: req.session})
})

module.exports = router