require('dotenv').config();
const mongoose = require('mongoose');
//const CONFIG = require('/config');

module.exports = {
    connection: null,
    connect: () => {
        return mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log('Base de datos conectada')
        }).catch((err) => {
             this.console.log(err)
        })
    }
}