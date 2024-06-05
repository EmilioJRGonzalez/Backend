import ChatService from '../services/ChatService.js'

const chat = new ChatService()

export default class ChatManager {
    constructor() {
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
