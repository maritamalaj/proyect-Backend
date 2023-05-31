import jwt from 'jsonwebtoken';
import config from './config/config.js'; 

export const PRIVATE_KEY = 'mysecretNEW'

export const generateToken = user=>{
    const token = jwt.sign({user}, config.PRIVATE_KEY, {expiresIn: '24h'})
    return token
}

export const authToken = (req,res,next)=>{
    const token = req.cookies[config.COOKIE_NAME]
    if(!token) return next()

    jwt.verify(token, config.PRIVATE_KEY, (error, credentials)=>{
        req.user = credentials.user
        next()
    })

}