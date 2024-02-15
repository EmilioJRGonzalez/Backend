const Chats = require('../models/chat.model')

class ChatManager {
    constructor(){
    }

    async AddMessage(msj){
        console.log("Inside ChatManager", msj)
        try{
            let resp = await Chats.create({messages: msj})
            console.log("RESP: ", resp)    
        }catch(err){
            console.log("ERR: ", err)   
        }
    }
}

module.exports = ChatManager

