import usersModel from './models/users.model.js'

class UserMongo{


    get = async (username) => {
        return await usersModel.findOne({email: username}).lean().exec()
    } 
    getOne = async (parameter) => {
        return await usersModel.findOne(parameter).lean().exec()
    }
    getAll = async () => {
        return await usersModel.find().lean().exec()
    } 

    getbyId = async (id) => {
        return await usersModel.findById(id).lean().exec()
    }
    create = async (newUser)=>{
        return await usersModel.create(newUser)        
    }
    update= async (id,updatedUser) => {
        return await usersModel.updateOne({_id:id},{$set: updatedUser})

    }   
    delete = async (id) => {
        return await usersModel.deleteOne({_id:id})        
    }
    eleteMany = async (arrayOfId) => {
        return await usersModel.deleteMany({_id:{$in: arrayOfId}})        
    }


}

//module.exports = UserManager;

export default UserMongo;