import UserService from '../services/UserService.js'
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

    async userFindById(id){
        try{
            let resp = await user.findUserById(id)
            return resp;
        }catch(err){
            console.debug(err)
            return err
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

    async updateUserRole(uid, newRole){
        try{
            let resp = await user.updateUserRoleById(uid, newRole)
            return resp;
        }catch(err){
            console.debug(err)
            return err
        }
    }

    async updateUserPassword(email, password){
        try{
            let resp = await user.updatePassword(email, password)
            return resp;
        }catch(err){
            console.debug(err)
            return err
        }
    }

    async updateLastConnection(email){
        try{
            let resp = await user.updateConnection(email)
            return resp;
        }catch(err){
            console.debug(err)
            return err
        }
    }

    async getUsers(){
        try{
            let resp = await user.findAllUsers()
            return resp;
        }catch(err){
            console.debug(err)
            return err
        }
    }

    async deleteInactiveUsers(){
        try{
            let resp = await user.deleteInactiveUsers()
            return resp;
        }catch(err){
            console.debug(err)
            return err
        }
    }

}

export default UserManager