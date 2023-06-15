import { Router } from "express";
import passport from "passport";
import { current, empty, githubcallback, login, logout, register } from '../controllers/session.controller.js';




const router = Router ()

router.post('/register', passport.authenticate('register', {session:false, failureRedirect:'/views/failregister'}), register)

router.post('/login', passport.authenticate('login', {session:false, failureRedirect:'/views/faillogin'}), login)

router.get('/login-github', passport.authenticate('github'), empty)

router.get('/githubcallback', passport.authenticate('github', {session:false, failureRedirect:'/views/faillogin'}), githubcallback)

router.get('/logout', logout)

router.get('/current',  passport.authenticate('current', {session:false}), current)


export default router;