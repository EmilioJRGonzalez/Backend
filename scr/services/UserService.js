import Users from '../models/db/user.model.js'

export default class UserService {
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

    async findUserById(uid){
        try{
            return await Users.findOne({_id: uid});
        }catch(err){
            return err
        }

    }

    async updateUserRoleById(uid, newRole) {
        try {
            const updatedUser = await Users.findByIdAndUpdate(
                {_id: uid},
                { role: newRole },
                { new: true } // Esto asegura que se devuelva el documento actualizado
            );
            return updatedUser;
        } catch (err) {
            return err;
        }
    }

    async updatePassword(email, newPassword) {
        try {
            const user = await Users.findOne({ email })
    
            if (user) {
                user.password = newPassword
                await user.save()
                return user
            } else {
                return 'Usuario no encontrado'
            }
        } catch (err) {
            return err
        }
    }

    async updateConnection(email) {
        try {
            const aux = await Users.findOneAndUpdate({ email }, { last_connection: new Date() })
        } catch (err) {
            return err
        }
    }

    async findAllUsers(){
        try{
            return await Users.find().select('first_name email role')
        }catch(err){
            return err
        }

    }

    async deleteInactiveUsers() {
        try {
            const limitDate = new Date()
            limitDate.setDate(limitDate.getDate() - 2) //2 dias
            //limitDate.setMinutes(limitDate.getMinutes() - 30) // 30 minutos

            const usersToDelete = await Users.find({
                last_connection: { $lt: limitDate },
                role: { $ne: "admin" }
            }).select('email')

            let result = await Users.deleteMany({
                last_connection: { $lt: limitDate },
                role: { $ne: "admin" }
            })

            return {
                result,
                usersDeleted: usersToDelete
            };
        } catch (err) {
            throw err
        }
    }

}
