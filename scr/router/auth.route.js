const express = require('express')
const UserManagerMongo = require('../dao/db/managers/UserManagerMongo')
const {createHash, isValidPassword} = require('../utils/bcrypt')
const passport = require('passport')

const {Router} = express
const router = new Router()

let user = new UserManagerMongo

router.post('/register', passport.authenticate('register', {failureRedirect: '/auth/failedRegister'}) , async (req, res) => {
    res.redirect('/view/login-view')
})

router.get('/failedRegister', async (req, res) => {
    res.send('Error al registrar el usuario')
})

router.post('/login', async (req, res) => {
    let userLogin = req.body

    let userFound = await user.userExist(userLogin.email)
    console.log(userFound)

    if (userFound && isValidPassword(userFound, userLogin.password)){
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