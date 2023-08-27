import { Router } from 'express';
import { getProducts, getProductById, addProduct, updateProductById, deleteProduct, mockingProducts } from "../controllers/products.controllers.js";
import { passportCall, authorization} from "../passaport_custom.js";

const router = Router()

router.get('/products', getProducts)

router.get('/products/:pid', getProductById)

router.get('/mockingproducts', mockingProducts)

router.post('/', passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['ADMIN']), addProduct)

router.put('/:pid', passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['ADMIN']), updateProductById)

router.delete('/:pid', passportCall('current', {session:false, failureRedirect:'/views/login'}),authorization(['ADMIN']), deleteProduct)

export default router;
