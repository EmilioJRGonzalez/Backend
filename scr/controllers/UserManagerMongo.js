const Users = require('../models/db/user.model')

class UserManager {
    constructor(){
    }

    async addUser(body){
        let resp
        try{
            resp = await Users.create(body)
            return `El usuario '${body.email}' fue creado correctamente`
        }catch(err){
            console.log (err)
            return `ERROR: No fue posible dar de alta el usuario ${body.email}. ${err.toString()}`
        }
    }

    async userExist(email){
        try{
            let resp = await Users.findOne({email})
            return resp;
        }catch(err){
            console.log(err)
            return err
        }
    }

}

module.exports = UserManager