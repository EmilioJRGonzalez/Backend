const Tickets = require('../models/db/ticket.model')

class TicketService {
    constructor(){
    }

    async createTicket(body){
        try{
            return await Tickets.create(body)
        }catch(err){
            return err
        }
    }

}

module.exports = TicketService