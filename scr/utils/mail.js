const CONFIG = require('../config/config')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: CONFIG.MAIL_USER, 
        pass: CONFIG.MAIL_PASSWORD,
    },
})

module.exports = transporter
