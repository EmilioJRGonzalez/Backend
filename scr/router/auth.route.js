const express = require('express')

const {Router} = express
const router = new Router()

let users = []

router.post('/register', (req, res) => {
    let userNew = req.body
    userNew.id = Math.random()
    users.push(userNew)

    res.redirect('/view/login-view')
})

router.post('/login', (req, res) => {
    console.log("USERS", users)
    let userLogin = req.body
    let userFound = users.find(user => {
        return user.email == userLogin.email && user.password == userLogin.password
    })

    if (userFound){
        req.session.email = userLogin.email
        req.session.password = userLogin.password
        req.session.rol = (userLogin.email === 'adminCoder@coder.com' && userLogin.password === 'adminCod3r123') ? 'admin' : 'usuario';

        res.redirect('/products')
        return
    }
    res.send("Usuario o contraseña incorrectos")
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) res.send("Error en logout")
    })
    res.redirect('/view/login-view')
})

router.get('/user', (req, res) => {
    res.send(users)
})

module.exports = router