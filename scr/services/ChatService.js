import Chats from '../models/db/chat.model.js'

export default class ChatService {
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

