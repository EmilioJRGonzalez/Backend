import Tickets from '../models/db/ticket.model.js'

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

export default TicketService
