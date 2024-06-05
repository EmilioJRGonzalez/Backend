import CONFIG from '../config/config.js'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: CONFIG.MAIL_USER, 
        pass: CONFIG.MAIL_PASSWORD,
    },
})

export default transporter
