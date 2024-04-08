const CONFIG = require('../config/config');

const jwt = require('jsonwebtoken')

const generateToken=(usuario)=> {
    const token = jwt.sign(usuario, CONFIG.SECRET_KEY, {expiresIn: '24h'})
    return token
}

const authToken = (token) => {
    jwt.verify (token, CONFIG.SECRET_KEY)
}

module.exports = {
    generateToken, 
    authToken
}
