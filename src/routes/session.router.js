import { Router } from "express";
import passport from "passport";
import { current, empty, githubcallback,goPremium, login, logout, recoverPass, recoverPassAction, register, reminder, uploaddocuments, getUsers, deleteInactive, deleteUser  } from '../controllers/session.controller.js';
import { authorization, passportCall} from '../passaport_custom.js';
import { uploader } from '../multer_utils.js'


const router = Router ()

router.get('/', passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['ADMIN','USER','PREMIUM']), getUsers)

router.delete('/', passportCall('current', {session:false, failureRedirect:'/views/login'}), authorization(['ADMIN']), deleteInactive)


router.post('/register', passport.authenticate('register', {session:false, failureRedirect:'/views/failregister'}), register)

router.post('/login', passport.authenticate('login', {session:false, failureRedirect:'/views/faillogin'}), login)

router.get('/login-github', passport.authenticate('github'), empty)

router.get('/githubcallback', passport.authenticate('github', {session:false, failureRedirect:'/views/faillogin'}), githubcallback)

router.get('/logout', passport.authenticate('current', {session:false}), logout)

router.get('/current',  passport.authenticate('current', {session:false}), current)

router.post('/reminder', reminder)

router.get('/recoverPass/:token', recoverPass)

router.post('/recoverPassAction/:token', recoverPassAction)

router.post('/premium/:uid', passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['ADMIN']), goPremium)

router.post('/delete/:uid', passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['ADMIN']), deleteUser)

router.post('/:uid/documents', passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['ADMIN','USER','PREMIUM']),uploader.any(), uploaddocuments)

export default router;