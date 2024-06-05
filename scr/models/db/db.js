import CONFIG from '../../config/config.js'
import mongoose from 'mongoose'

export default {
    connection: null,
    connect: () => {
        return mongoose.connect(CONFIG.MONGO_URL)
        .then(() => {
            console.log('Base de datos conectada')
        }).catch((err) => {
            console.error(err)
        });
    }
}
