import UserDTO from "../dao/DTO/users.dto.js";

class UserRepository{

    constructor(dao){
        this.dao = dao;
    }

    get = async (username) => {
        return await this.dao.get(username)
    }

    getOne = async (parameter) => {
        return await this.dao.getOne(parameter); 
    }

    getbyId = async (id) => {
        return await this.dao.getbyId(id); 
    }

    getCurrent = async (user) => {
        const userToShow = new UserDTO(user).current()
        return userToShow; 
    }

    create = async (userTemplate) => {
        const userToInstert = new UserDTO(userTemplate);
        return await this.dao.create(userToInstert)
    }

    update= async (id,updatedUser) => {
        return await this.dao.updateOne(id,updatedUser)
    }   
    delete = async (id) => {
        return await this.dao.deleteOne(id)        
    }

}

export default UserRepository