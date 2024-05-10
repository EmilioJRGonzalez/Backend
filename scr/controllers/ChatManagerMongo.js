const ChatService = require('../services/ChatService')
let chat = new ChatService

class ChatManager {
    constructor(){
    }

    async AddMessage(msj){
        console.log("Inside ChatManager", msj)
        try{
            let resp = await chat.createMessage(msj)
            console.debug(resp)
        }catch(err){
            console.warn(err)
        }
    }
}

module.exports = ChatManager

