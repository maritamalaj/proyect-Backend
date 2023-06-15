import ticketsModel from './models/tickets.model.js'

class TicketMongo{


    get = async (parameter) => {
        return await ticketsModel.findOne(parameter).lean().exec()
    } 
    getbyId = async (id) => {
        return await ticketsModel.findById(id).lean().exec()
    }
    create = async (newTicket)=>{
        return await ticketsModel.create(newTicket)        
    }
    update = async (id,updatedTicket) => {
        return await ticketsModel.updateOne({_id:id},updatedTicket)
    }   
    delete = async (id) => {
        return await ticketsModel.deleteOne({_id:id})        
    }

}

//module.exports = TicketManager;

export default TicketMongo;