const express = require('express')
const UserManagerMongo = require('../dao/db/managers/UserManagerMongo')

const {Router} = express
const router = new Router()

let user = new UserManagerMongo

router.post('/register', async (req, res) => {
    let userNew = req.body

    let aux = await user.addUser(userNew)
    console.log(aux)

    res.redirect('/view/login-view')
})

router.post('/login', async (req, res) => {
    let userLogin = req.body

    let userFound = await user.userExist(userLogin.email, userLogin.password)
    console.log(userFound)

    if (userFound){
        req.session.email = userLogin.email
        req.session.password = userLogin.password
        console.log("ROL: ", userFound.user_type)
        req.session.rol = userFound.user_type
        //req.session.rol = (userLogin.email === 'adminCoder@coder.com' && userLogin.password === 'adminCod3r123') ? 'admin' : 'usuario';

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

/* router.get('/user', (req, res) => {
    res.send(users)
}) */

module.exports = router