import TicketDTO from '../dao/DTO/tickets.dto.js';
class TicketRepository{

    constructor(dao){
        this.dao = dao;
    }

    get = async (parameter) => {
        return await this.dao.get(parameter)
    }

    getbyId = async (id) => {
        return await this.dao.getbyId(id); 
    }

    create = async (ticket) => {
        const newTicket = new TicketDTO(ticket)
       return await this.dao.create(newTicket)
    }
    update= async (id,updatedTicket) => {
        return await this.dao.updateOne(id,updatedTicket)
    }   
    delete = async (id) => {
        return await this.dao.deleteOne(id)        
    }
}


export default TicketRepository