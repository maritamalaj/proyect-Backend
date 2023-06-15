import { Router } from 'express';
import { getProducts, getProductById, addProduct, updateProductById, deleteProduct } from '../controllers/products.controller.js';
import { passportCall, authorization} from "../passport_custom.js";

const router = Router()

router.get('/products', getProducts)

router.get('/products/:pid', getProductById)

router.post('/', passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['ADMIN']), addProduct)

router.put('/:pid', passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['ADMIN']), updateProductById)

router.delete('/:pid', passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['ADMIN']), deleteProduct)

export default router;
