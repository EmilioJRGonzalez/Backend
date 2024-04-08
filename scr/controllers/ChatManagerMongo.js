const ChatService = require('../services/ChatService')
let chat = new ChatService

class ChatManager {
    constructor(){
    }

    async AddMessage(msj){
        console.log("Inside ChatManager", msj)
        try{
            let resp = await chat.create(msj)
            console.log("RESP: ", resp)    
        }catch(err){
            console.log("ERR: ", err)   
        }
    }
}

module.exports = ChatManager

