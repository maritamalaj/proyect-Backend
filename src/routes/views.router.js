import { Router } from "express";
import passport from "passport";
import { cartDetail, failLoginView, failRegisterView, getProductByIdView, getProductsView, homeView, loginView, realtimeProductsView, registerView, reminderView, userManager, userManagerSel } from "../controllers/views.controllers.js";
import { passportCall, authorization} from "../passaport_custom.js";

const router = Router()

router.get('/products', passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['PUBLIC']), getProductsView)

router.get('/products/:pid',  passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['PUBLIC']), getProductByIdView)

router.get('/home',  passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['PUBLIC']), homeView)

router.get('/realtimeproducts',  passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['PUBLIC']), realtimeProductsView)

router.get('/carts/:cid',  passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['USER', 'ADMIN', 'PREMIUM']),  cartDetail)

router.get('/login', loginView)

router.get('/register', registerView)

router.get('/failregister', failRegisterView)

router.get('/faillogin', failLoginView)

router.get('/reminder', reminderView)

router.get('/usermanager/:uid', passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['ADMIN']),  userManager )

router.get('/usermanager-sel', passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['ADMIN']),  userManagerSel )



export default router;

