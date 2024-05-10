const { Command } = require ('commander')

const program = new Command()

program.option('--mode <mode>', 'Modo de trabajo', 'develop')
program.parse()

console.log("Mode Option: ", program.opts().mode)

const environment = program.opts().mode;

require('dotenv').config({
    path: '.env'
});

module.exports = 
{
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    ENVIRONMENT: environment
};