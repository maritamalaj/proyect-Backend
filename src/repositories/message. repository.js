import MessageDTO from '../dao/DTO/messages.dto.js'

class MessageRepository{

    constructor(dao){
        this.dao = dao;
    }

    get = async () => {
        return await this.dao.get()
    }

    create = async (data)=>{
        const messageToInstert = new MessageDTO(data);
        return await this.dao.create(messageToInstert)        
    }


}

export default MessageRepository