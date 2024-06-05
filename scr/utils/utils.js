import CONFIG from '../config/config.js'
import jwt from 'jsonwebtoken'

const generateToken=(usuario, expiresIn = '24h')=> {
    const token = jwt.sign(usuario, CONFIG.SECRET_KEY, { expiresIn })
    return token
}

const authToken = (token) => {
    try {
        const decoded = jwt.verify(token, CONFIG.SECRET_KEY);
        return decoded;
    } catch (error) {
        throw error;
    }
}

export { generateToken, authToken }
