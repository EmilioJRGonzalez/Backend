const { generateToken, authToken } = require('../utils/utils')

const authII=(req, res, next)=> {
    if (!req.headers["authorization"]){
        res.setHeader('Content-Type', 'application/json')
        return res.status(401).json({error: 'Usuario no autenticado'})
    }

    let token = req.headers["authorization"].split(" ")[1]
    try{
        let usuario = authToken(token)
        req.user=usuario
    }catch(err){
        res.setHeader('Content-Type', 'application/json')
        return res.status(401).json({error: err.message})
    }

    next()
}

module.exports = authII