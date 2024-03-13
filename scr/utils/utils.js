const jwt = require('jsonwebtoken')

const SECRET_KEY="Coder55665"

const generateToken=(usuario)=> {
    const token = jwt.sign(usuario, SECRET_KEY, {expiresIn: '24h'})
    return token
}

const authToken = (token) => {
    jwt.verify (token, SECRET_KEY)
}

module.exports = {
    generateToken, 
    authToken
}
