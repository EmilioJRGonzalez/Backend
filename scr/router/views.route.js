const express = require('express')

const {Router} = express
const router = new Router()

function auth(req, res, next){
    console.log("SESSION ", req.session.email)
    if(req.session.email){
        next()
    }else{
        res.send("Ud. no tiene permisos para acceder a esta página")
    }
}

router.get('/login-view', (req, res) => {
    res.render('login')
})

router.get('/register-view', (req, res) => {
    res.render('register')
})

router.get('/profile-view', auth, (req, res) => {
    res.render('profile')
})

module.exports = router