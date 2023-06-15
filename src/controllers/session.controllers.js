import config from '../config/config.js';
import { UserService } from "../repositories/index.js";

export const register = async (req, res) => {
    res.redirect('/views/login')
}

export const login = async (req, res) => {
    if (!req.user){
        return res.status(401).render('session-views/login',{error: 'User not found or Incorrect password'})
    }
    return res.cookie(config.COOKIE_NAME, req.user.token).redirect('/views/products')
}

export const empty = async (req, res) => {

}

export const githubcallback = async (req, res) => {
    return res.cookie(config.COOKIE_NAME, req.user.token).redirect('/views/products')
}

export const logout = async (req, res) => {
    res.clearCookie("auth").redirect('/views/login')
}

export const current = async (req, res) => {
    const userInfo = await UserService.getCurrent(req.user.user)
    res.send(userInfo)
}