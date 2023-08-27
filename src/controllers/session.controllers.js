import config from '../config/config.js';
import { createHash, isValidPassword } from '../encrypt.js';
import { UserService } from "../repositories/index.js";

export const getUsers = async(req,res)=>{
    const users = await UserService.getAll()
    res.send({message:'Users', payload: users})
}

export const deleteInactive = async(req,res)=>{
    const deletedUsers = await UserService.deleteInactive()
    res.send({message:'Users deleted', payload: deletedUsers})
}


export const register = async (req, res) => {
    res.redirect('/views/login')
}

export const login = async (req, res) => {
    if (!req.user){
        return res.status(401).render('session-views/login',{error: 'User not found or Incorrect password'})
    }
    req.logger.info('Login Correcto')
    return res.cookie(config.COOKIE_NAME, req.user.token).redirect('/views/products')
}

export const empty = async (req, res) => {

}

export const githubcallback = async (req, res) => {
    return res.cookie(config.COOKIE_NAME, req.user.token).redirect('/views/products')
}

export const logout = async (req, res) => {
    await UserService.update(req.user.user._id, {last_connection: new Date()})
    res.clearCookie("auth").redirect('/views/login')
}

export const current = async (req, res) => {
    const userInfo = await UserService.getCurrent(req.user.user)
    delete userInfo.documents;
    res.send(userInfo)
}

export const reminder = async (req, res) =>{
    const { email } = req.body
    const result = await UserService.reminder(email)
    res.render('session-views/login',result)
}
export const recoverPass = async (req, res) =>{
    const token = req.params.token
    const result = await UserService.recoverPass(token)
    if (result) res.render('session-views/recoverPass',{token})
    else res.render('session-views/reminder')
}
export const recoverPassAction = async (req, res) =>{
    const token = req.params.token
    const {password} = req.body 
    const result = await UserService.recoverPass(token)
    if (!isValidPassword(result, password)) {
        result.password = createHash(password)
        console.log(result);
        const newUserPassword = await UserService.update(result._id, result)
        if (newUserPassword) res.render('session-views/login',{message:"Contraseña Cambiada"})
    } else {
        res.render('session-views/login',{error:"LA CONTRASEÑA DEBE SER DIFERENTE A LAS YA USADAS"})
    }
}

export const goPremium = async (req, res) =>{
    const uid = req.params.uid
    const result = await UserService.Premium(uid)
    if (result == 'Missing Documents'){
        return res.send({error: "Faltan Documentos"})    
    }
    return res.send(result)
}

export const deleteUser = async(req,res)=>{
    const uid = req.params.uid
    const deletedUser = await UserService.delete(uid)
    res.send({message:'User deleted', payload: deletedUser})
}


export const uploaddocuments = async (req, res) =>{
    const uid = req.params.uid
    console.log(req.files);
    const user = await UserService.getbyId(req.user.user._id)
    req.user.user.documents = user.documents
    console.log(req.user.user);
    if(!req.files){
        return res.status(400).send({status:'error',error:'no file'})
    }
    if (!req.user.user?.documents) {
        req.user.user.documents = []
    } 
    for (let index = 0; index < req.files.length; index++) {
        req.user.user.documents.push({name: req.files[index].fieldname, reference:req.files[index].path})
    }

    console.log(req.user.user);

    const result = await UserService.update(uid, req.user.user)
    res.send({result, message:'file uploaded'})
}