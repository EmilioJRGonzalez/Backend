const CONFIG = require('../../config/config');
const mongoose = require('mongoose');

module.exports = {
    connection: null,
    connect: () => {
        return mongoose.connect(CONFIG.MONGO_URL)
        .then(() => {
            console.log('Base de datos conectada')
        }).catch((err) => {
             this.console.log(err)
        })
    }
}