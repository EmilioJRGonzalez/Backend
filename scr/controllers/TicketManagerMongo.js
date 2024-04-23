const TicketService = require('../services/TicketService')
let ticket = new TicketService

class TicketManager {
    constructor(){
    }

    async addTicket(data){
        let resp
        try{
            resp = await ticket.createTicket(data)
            return `El ticket '${data.code}' fue creado correctamente`
        }catch(err){
            console.log (err)
            return `ERROR: No fue posible guardar la compra ${data.code}. ${err.toString()}`
        }
    }

}

module.exports = TicketManager