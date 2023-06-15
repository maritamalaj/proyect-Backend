import {Router} from 'express'
import { get } from '../controllers/chat.controller.js';
import { passportCall, authorization} from "../passport_custom.js";

const router = Router()

router.get('/', passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['USER']), get)

export default router;