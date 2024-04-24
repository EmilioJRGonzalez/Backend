const { generateToken, authToken } = require('../utils/utils')

const authII=(req, res, next)=> {

    if (!req.session || !req.session.rol || !req.session.email) {
        return res.send("Ud. no tiene permisos para acceder a esta página")
    }

    console.log(req.path, req.baseUrl, req.method, req.session.rol )

/*     if (req.path === '/products' && req.method === 'GET' && rol === 'user') {
        return res.send("Ud no tiene permisos para acceder a esta ruta")
    } */

    if (req.baseUrl === '/api/cart' && req.method === 'POST' && req.session.rol != 'user') {
        return res.send("Ud no tiene permisos para acceder a esta ruta")
    }

    next()
}

module.exports = authII