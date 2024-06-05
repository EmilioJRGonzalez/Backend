import TicketService from '../services/TicketService.js'

const ticket = new TicketService()

export default class TicketManager {
    constructor(){
    }

    async addTicket(data){
        let resp
        try{
            resp = await ticket.createTicket(data)
            return `El ticket '${data.code}' fue creado correctamente`
        }catch(err){
            console.warn(err)
            return `ERROR: No fue posible guardar la compra ${data.code}. ${err.toString()}`
        }
    }

}
