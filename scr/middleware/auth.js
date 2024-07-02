
const authII=(req, res, next)=> {

    const respuesta = "Ud no tiene permisos para acceder a esta ruta"
    req.logger.debug(req.session.rol + ' - ' + req.session.email)

    if (!req.session || !req.session.rol || !req.session.email) {
        return res.send("Ud. no tiene permisos para acceder a esta página")
    }

    console.log(req.path, req.baseUrl, req.method, req.session.rol )

    if (req.baseUrl === '/api/cart' && req.method === 'POST' && ['user', 'premium'].indexOf(req.session.rol) === -1) {
        return res.send(respuesta)
    }

    if (req.baseUrl === '/purchase' && req.method === 'GET' && ['user', 'premium'].indexOf(req.session.rol) === -1) {
        return res.send(respuesta)
    }

    if (req.baseUrl === '/realtimeproducts' && req.method === 'GET' && ['admin', 'premium'].indexOf(req.session.rol) === -1) {
        return res.send(respuesta)
    }

    if (req.baseUrl === '/chat' && req.method === 'GET' && ['user', 'premium'].indexOf(req.session.rol) === -1) {
        return res.send(respuesta)
    }

    if (req.path === '/admin-users' && req.method === 'GET' && ['admin'].indexOf(req.session.rol) === -1) {
        return res.send(respuesta)
    }

    next()
}

export default authII