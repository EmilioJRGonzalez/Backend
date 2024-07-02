import express from 'express'
import authII from '../middleware/auth.js'
import { authToken } from '../utils/utils.js'
import UserManagerMongo from '../controllers/UserManagerMongo.js'

const router = express.Router()

const user = new UserManagerMongo()

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
        res.status(400).send(`
            <html>
                <body>
                    <h1>Token inválido o expirado</h1>
                    <p>El enlace para restablecer la contraseña es inválido o ha expirado.</p>
                    <button onclick="window.location.href='/view/passrecovery-view'">Ir a recuperación de contraseña</button>
                </body>
            </html>
        `)
    }
})

router.get('/admin-users', authII, async (req, res) => {
    let aux = await user.getUsers()
    res.render('adminUsers', {users: aux})
})

export default router