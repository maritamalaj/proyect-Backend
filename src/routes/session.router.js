import { Router } from "express";
import passport from "passport";
import config from '../config/config.js';


const router = Router ()

router.post('/register', passport.authenticate('register', {failureRedirect:'/views/failregister'}), async (req, res) =>{
     res.redirect('/views/login')
})

router.post('/login', passport.authenticate('login', {session:false, failureRedirect:'/views/faillogin'}), async (req, res) =>{
    if (!req.user){
        return res.status(401).render('session-views/login',{error: 'User not found or Incorrect password'})
    }
    const accessToken = generateToken(req.user)

    return res.cookie(config.COOKIE_NAME, req.user.token).redirect('/views/products')
})

router.get('/login-github', passport.authenticate('github'), async (req,res) => {})

router.get('/githubcallback', passport.authenticate('github', {session:false, failureRedirect:'/views/faillogin'}), async (req, res,)=>{
    const accessToken = generateToken(req.user)
    return res.cookie(config.COOKIE_NAME, req.user.token).redirect('/views/products')
}) 


router.get('/logout', (req, res) => {
    res.clearCookie("auth").redirect('/views/login')
 
})

router.get('/current',  passport.authenticate('current', {session:false}), (req, res) => {
    res.send(req.user.user)
})
 

export default router;