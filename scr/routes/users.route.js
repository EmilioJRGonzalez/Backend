import express from 'express'
import passport from 'passport'
import UserManagerMongo from '../controllers/UserManagerMongo.js'
import { createHash, isValidPassword } from '../utils/bcrypt.js'
import { generateToken, authToken } from '../utils/utils.js'
import authII from '../middleware/auth.js'
import transporter from '../utils/mail.js'
import CONFIG from '../config/config.js'

const { Router } = express
const router = new Router()

const user = new UserManagerMongo()

router.post('/register', passport.authenticate('register', {failureRedirect: '/api/users/failedRegister'}) , async (req, res) => {
    res.redirect('/view/login-view')
})

router.get('/failedRegister', async (req, res) => {
    res.send('Error al registrar el usuario')
})

router.post('/login', async (req, res) => {
    let userLogin = req.body

    let userFound = await user.userExist(userLogin.email)

    if (userFound && isValidPassword(userFound, userLogin.password)){
        req.session.email = userLogin.email
        req.session.password = userLogin.password
        req.session.rol = userFound.role
        req.session.cart = userFound.cart

        delete userLogin.password
        //let token = generateToken(userLogin)

        user.updateLastConnection(userLogin.email)

        res.redirect('/products')
        return
    }
    res.send("Usuario o contraseña incorrectos")
})

router.get('/logout', async(req, res) => {
    user.updateLastConnection(req.session.email)
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
    req.logger.debug(req.user)
    req.session.rol = 'user'

    res.redirect('/products')
})

/* router.get('/user', (req, res) => {
    res.send(users)
}) */

router.get('/perfil', authII, (req, res)=>{

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({
        mensaje: 'Perfil usuario',
        usuario: req.user
    })
})

router.post('/forgot-password', async (req, res) => {
    let userLogin = req.body
    let userFound = await user.userExist(userLogin.email)

    if (!userFound) {
        return res.status(400).send('Usuario no encontrado')
    }

    let token = generateToken({email: userLogin.email}, '1h')
    let resetLink = ""

    if (CONFIG.HOST.includes("railway.app")) {
        resetLink = `${CONFIG.PROTOCOL}://${CONFIG.HOST}/view/reset_password-view/${token}`
    }else{
        resetLink = `${CONFIG.PROTOCOL}://${CONFIG.HOST}:${CONFIG.PORT}/view/reset_password-view/${token}`
    }

    console.log("resetLink", resetLink )

    let mensaje = await transporter.sendMail({
        from: `Ecommerce test ${CONFIG.MAIL_USER}`,
        to: userLogin.email,
        subject: 'CODERHOUSE: Restablecimiento de contraseña',
        text: 'Restablecimiento de contraseña',
        html: `<p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
        <a href="${resetLink}">Restablecer contraseña</a>
        <p>El enlace expirará en 1 hora.</p>` 
    })
    if(!!mensaje.messageId){
        console.log('Correo de restablecimiento enviado', mensaje.messageId)
    }
  
    res.send('Correo de restablecimiento enviado');
  });

  router.post('/reset-password/:token', async (req, res) => {
    let token = req.params.token
    let newPassword = req.body.newPassword
    let confirmPassword = req.body.confirmPassword

    if (newPassword !== confirmPassword) {
        return res.send(`
            <html>
                <body>
                    <h1>Error</h1>
                    <p>Las contraseñas no coinciden. Por favor, inténtalo de nuevo.</p>
                    <button onclick="window.history.back()">Volver</button>
                </body>
            </html>
        `);
    }

    let payload = authToken(token)
    console.log("payload", payload)
    let email = payload.email

    let userFound = await user.userExist(payload.email)

    if (!userFound) {
        return res.status(400).send('Usuario no encontrado')
    }

    if (userFound && isValidPassword(userFound, newPassword)){
        return res.send(`
            <html>
                <body>
                    <h1>Error</h1>
                    <p>No se puede colocar la misma contraseña. Por favor, inténtalo de nuevo.</p>
                    <button onclick="window.history.back()">Volver</button>
                </body>
            </html>
        `);
    }

    try {
        const hashedPassword = createHash(newPassword)
        console.log(hashedPassword)

        let resp = user.updateUserPassword(email, hashedPassword)
        console.log(resp)
        
        res.send(`
            <html>
                <body>
                    <h1>Contraseña restablecida correctamente</h1>
                    <p>Tu contraseña ha sido actualizada con éxito.</p>
                    <button onclick="window.location.href='/view/login-view'">Ir a inicio de sesión</button>
                </body>
            </html>
        `)
    } catch (error) {
        res.send(`
            <html>
                <body>
                    <h1>Error al reestablecer la contraseña</h1>
                    <p>Intentelo nuevamente.</p>
                    <button onclick="window.history.back()">Volver</button>
                </body>
            </html>
        `);
    }
})

router.post('/premium/:uid', async (req, res) => {
    let uid = req.params.uid
    let role = req.body.role
    let aux

    const validRoles = ['user', 'premium']
    const reqDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta']

    if (validRoles.includes(role)) {
        if (role === 'premium') {
            try {
                aux = await user.userFindById(uid)
                
                if (!aux) {
                    return res.status(404).send({ message: 'Usuario no encontrado' })
                }

                const userDocuments = aux.documents.map(doc => doc.name)
                const hasAllRequiredDocuments = reqDocuments.every(doc => userDocuments.includes(doc))

                if (!hasAllRequiredDocuments) {
                    return res.status(400).send({ message: 'El usuario no ha terminado de procesar su documentación' })
                }

                aux = await user.updateUserRole(uid, role)
                return res.send({ data: aux, message: 'Rol actualizado correctamente' })
            } catch (error) {
                return res.status(500).send({ message: 'Error del servidor', error });
            }
        }else{
            aux = await user.updateUserRole(uid, role)
            return res.send({ data: aux, message: 'Rol actualizado correctamente' })
        }
    }else{
        return res.status(400).send({data: aux, message: `No se puede modificar el Rol a ${role}`})
    }

})

export default router