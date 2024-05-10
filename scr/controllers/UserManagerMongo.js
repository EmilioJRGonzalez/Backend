const UserService = require('../services/UserService')
let user = new UserService

class UserManager {
    constructor(){
    }

    async addUser(body){
        let resp
        try{
            resp = await user.createUser(body)
            return `El usuario '${body.email}' fue creado correctamente`
        }catch(err){
            console.warn(err)
            return `ERROR: No fue posible dar de alta el usuario ${body.email}. ${err.toString()}`
        }
    }

    async userExist(email){
        try{
            let resp = await user.findOneUser(email)
            return resp;
        }catch(err){
            console.debug(err)
            return err
        }
    }

}

module.exports = UserManager