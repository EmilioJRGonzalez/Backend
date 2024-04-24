const Users = require('../models/db/user.model')

class UserService {
    constructor(){
    }

    async createUser(body){
        try{
            return await Users.create(body)
        }catch(err){
            return err
        }
    }

    async findOneUser(email){
        try{
            return await Users.findOne({email});
        }catch(err){
            return err
        }

    }

}

module.exports = UserService