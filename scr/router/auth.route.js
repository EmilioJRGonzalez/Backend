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

router.get('/github', passport.authenticate("github", {}),  async (req, res) => {
})

router.get('/callbackGithub', passport.authenticate("github", {}),  async (req, res) => {

    /* req.session.usuario = req.user
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({payload:req.user}); */

    req.session.email = req.user.email
    console.log("req: ", req.user)
    req.session.rol = 'usuario'

    res.redirect('/products')
})

/* router.get('/user', (req, res) => {
    res.send(users)
}) */

module.exports = router