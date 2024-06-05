import crypto from 'crypto'

export const generateRandomValue = (length) => {
    return crypto.randomBytes(length).toString('hex')
}
