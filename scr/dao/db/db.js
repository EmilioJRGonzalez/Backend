const mongoose = require('mongoose');
//const CONFIG = require('/config');

module.exports = {
    connection: null,
    connect: () => {
        return mongoose.connect('mongodb+srv://emiliojrg88:pBMHOMINd1WpdtGd@coder.q3bmoe2.mongodb.net/ecommerce')
        .then(() => {
            console.log('Base de datos conectada')
        }).catch((err) => {
             this.console.log(err)
        })
    }
}