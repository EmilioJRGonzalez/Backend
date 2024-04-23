const crypto = require('crypto')

const generateRandomValue = (length) => {
    return crypto.randomBytes(length).toString('hex');
}

module.exports = {
    generateRandomValue
}
