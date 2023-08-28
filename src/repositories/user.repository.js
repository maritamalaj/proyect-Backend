import UserDTO from "../dao/DTO/users.dto.js";
import { generateToken, verifyUser } from "../jwt_utils.js"
import Mail from "../modules/mails.js";

class UserRepository{

    constructor(dao){
        this.dao = dao;
        this.mail = new Mail();

    }

    get = async (username) => {
        return await this.dao.get(username)
    }

    getAll = async () => {
        const users = await this.dao.getAll()
        const usersToSend = [];
        for (let user of users) {
            user = new UserDTO(user).getAll()
            usersToSend.push(user)
        }
        return usersToSend
    }
    getAllFull = async () => {
        return await this.dao.getAll()
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
        return await this.dao.delete(id)        
    }
    
    deleteInactive = async () =>{
        const users = await this.dao.getAll()
        const usersToRemove = []
        const hoy = new Date()
        const html = `<h2>Debido al tiempo transcurrido, su usuario se ha eliminado</h2>`
        for (let i = 0; i < users.length; i++) {
            if (!users[i].last_connection){
                    usersToRemove.push(users[i]._id)
                    const result = this.mail.send(users[i], "Su usuario va a eliminarse", html)
            }
            if (users[i].last_connection) {
                const tiempo_transcurrido = hoy.getTime() - users[i].last_connection.getTime()
                const tiempo_transcurridoEnMinutos = Math.floor(tiempo_transcurrido / (1000 * 60));       
                if (tiempo_transcurridoEnMinutos > 2880 && users[i].role != 'admin'){
                    usersToRemove.push(users[i]._id)
                    const result = this.mail.send(users[i], "Su usuario va a eliminarse", html)
                }
            }
        }
        const removing = await this.dao.deleteMany(usersToRemove)
        return removing
    }


    reminder = async(email)=>{
        const user = await this.dao.getOne({email: email})
        if (!user) {
            return {error:"No hay usuario con ese correo"}
        }
        const token = generateToken(user)
        let html = `<h1> Recupere su contraseña: </h1>
        <h2><a href="http://proyect-backend-production.up.railway.app/api/users/recoverPass/${token}">Link de recuperación</a><h2>
        `
        
        //send email
        const result = this.mail.send(user, "Recupere su contraseña", html)
        return {message: "Correo enviado"}
    }
    recoverPass = async (token) => {
        const user = verifyUser(token)
        return user
    }

    Premium = async (uid) => {
        const user = await this.dao.getbyId(uid)

        const identificacion = user.documents.find(documento => documento.name === "identificacion");
        const comprobante = user.documents.find(documento => documento.name === "comprobanteDomicilio");
        const estado = user.documents.find(documento => documento.name === "estadoDeCuenta");


        if (user.role == 'premium'){
            user.role = 'user'
            await this.dao.update(user._id, {role: user.role})
            
        } else if (user.role == 'user'){
            if (identificacion && comprobante && estado){
                user.role = 'premium'
                await this.dao.update(user._id, {role: user.role})
            } else {
                return 'Missing Documents'
            }
        }
        console.log(user.role);
        return user 
    }   
}

export default UserRepository