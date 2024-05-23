
const authII=(req, res, next)=> {

    req.logger.debug(req.session.rol + ' - ' + req.session.email)

    if (!req.session || !req.session.rol || !req.session.email) {
        return res.send("Ud. no tiene permisos para acceder a esta página")
    }

    console.log(req.path, req.baseUrl, req.method, req.session.rol )

    if (req.baseUrl === '/api/cart' && req.method === 'POST' && ['user', 'premium'].indexOf(req.session.rol) === -1) {
        return res.send("Ud no tiene permisos para acceder a esta ruta")
    }

    if (req.baseUrl === '/purchase' && req.method === 'GET' && ['user', 'premium'].indexOf(req.session.rol) === -1) {
        return res.send("Ud no tiene permisos para acceder a esta ruta")
    }

    if (req.baseUrl === '/realtimeproducts' && req.method === 'GET' && ['admin', 'premium'].indexOf(req.session.rol) === -1) {
        return res.send("Ud no tiene permisos para acceder a esta ruta")
    }

    if (req.baseUrl === '/chat' && req.method === 'GET' && ['user', 'premium'].indexOf(req.session.rol) === -1) {
        return res.send("Ud no tiene permisos para acceder a esta ruta")
    }

    next()
}

module.exports = authII