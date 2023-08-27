import {Router} from 'express'
import { get } from '../controllers/chat.controllers.js';
import { passportCall, authorization} from "../passaport_custom.js";

const router = Router()

router.get('/', passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['USER']), get)

export default router;