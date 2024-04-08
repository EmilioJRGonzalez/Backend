const Chats = require('../models/db/chat.model')

class ChatService {
    constructor(){
    }

    async createMessage(msj){
        try{
            return await Chats.create({messages: msj}) 
        }catch(err){
            return err.toString()
        }
    }
}

module.exports = ChatService

