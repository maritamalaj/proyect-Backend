import messagesModel from './models/messages.model.js'

class MessageMongo{


    get = async () => {
        return await messagesModel.find(/* {$or:[{user:data }, {user:'At. al Cliente'}]} */).lean().exec()
    } 

    create = async (data)=>{
        return await messagesModel.create(data)      
    }

}

//module.exports = UserManager;

export default MessageMongo;