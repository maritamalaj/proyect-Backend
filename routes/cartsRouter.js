import {Router} from 'express'
import CartManager from '../class/cartManager';


const router = Router();

//Instancia de clases
const manager = new CartManager ('../database/cart.json')

//agrego al carrito
router.post('/', async (req, res) => {
  const newCart = await manager.addCart()
  res.send({newCart})
})

//muestro los datos del carrito
router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid
  const selCart = await manager.getCartById(cartId)
  res.send({selCart})
})

router.get('/', async (req, res) => {
  const carts = await manager.getCarts()
  res.send({carts})
})

//agrega un prod al carrito corresp
routerCarts.post("/:cid/product/:pid",async (req, res) => {
    const carId = req.params.cid;
    const productId = parseInt (req.params.pid);
    await manager. addProductById (cartId,productId,1)
    const selCart =await manager.getCartById(cartId)
    res.send ({selCart})
 
});

export default router;