require('dotenv').config({
    path: '.env'
});

module.exports = 
{
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    ADMIN_EMAIL: process.env.SECRET_KEY,
    ADMIN_PASSWORD: process.env.SECRET_KEY
};