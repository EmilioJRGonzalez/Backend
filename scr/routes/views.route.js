const express = require('express')
const authII = require('../middleware/auth')
const { authToken } = require('../utils/utils')

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

router.get('/passrecovery-view', (req, res) => {
    res.render('passrecovery')
})

router.get('/reset_password-view/:token', async (req, res) => {
    let token = req.params.token;

    try {   
        let payload = authToken(token)
        console.log("payload", payload)
        let email = payload.email;

        res.render('resetPassword', { token })

    } catch (error) {
        console.log("Err:", error)
        res.send(`
            <html>
                <body>
                    <h1>Token inválido o expirado</h1>
                    <p>El enlace para restablecer la contraseña es inválido o ha expirado.</p>
                    <button onclick="window.location.href='/view/passrecovery-view'">Ir a recuperación de contraseña</button>
                </body>
            </html>
        `);
    }
});

module.exports = router