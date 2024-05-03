
const authII=(req, res, next)=> {

    if (!req.session || !req.session.rol || !req.session.email) {
        return res.send("Ud. no tiene permisos para acceder a esta página")
    }

    console.log(req.path, req.baseUrl, req.method, req.session.rol )

    if (req.baseUrl === '/api/cart' && req.method === 'POST' && req.session.rol != 'user') {
        return res.send("Ud no tiene permisos para acceder a esta ruta")
    }

    if (req.baseUrl === '/realtimeproducts' && req.method === 'GET' && req.session.rol != 'admin') {
        return res.send("Ud no tiene permisos para acceder a esta ruta")
    }

    if (req.baseUrl === '/chat' && req.method === 'GET' && req.session.rol != 'user') {
        return res.send("Ud no tiene permisos para acceder a esta ruta")
    }

    next()
}

module.exports = authII