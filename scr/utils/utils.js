require('dotenv').config();

const jwt = require('jsonwebtoken')

const generateToken=(usuario)=> {
    const token = jwt.sign(usuario, process.env.SECRET_KEY, {expiresIn: '24h'})
    return token
}

const authToken = (token) => {
    jwt.verify (token, process.env.SECRET_KEY)
}

module.exports = {
    generateToken, 
    authToken
}
