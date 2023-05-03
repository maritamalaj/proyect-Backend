import { Router } from "express";

import passport from "passport";

const router = Router ()

router.post('/register', passport.authenticate('register', {failureRedirect:'/views/failregister'}), async (req, res) =>{
    console.log(req.user);
    res.redirect('/views/login')
})

router.post('/login', passport.authenticate('login', {failureRedirect:'/views/faillogin'}), async (req, res) =>{
    if (!req.user){
        return res.status(401).render('session-views/login',{error: 'User not found or Incorrect password'})
    }
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        role: req.user.role,
        email: req.user.email
    }
    return res.redirect('/views/products')
})

router.get('/login-github', passport.authenticate('github'), async (req,res) => {})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/views/faillogin'}), async (req, res,)=>{
    req.session.user = req.user
    return res.redirect('/views/products')
})  


router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/views/login')
})

 




export default router;