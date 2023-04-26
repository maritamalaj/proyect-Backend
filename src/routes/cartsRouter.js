import { Router } from 'express';
import CartManager from '../dao/managers/db/cartManager.js';


const router = Router();

//Instancia de clases
const manager = new CartManager()

//agrego al carrito
router.post('/', async (req, res) => {
  const newCart = await manager.addCart()
  res.send(newCart)
})

//muestro los datos del carrito
router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid
    const selCart = await manager.getCartById(cartId)
    res.send(selCart)
  } catch (error) {
    res.status(401).send({status: 'error', error: 'Not found'})
  }
})
  

router.get('/', async (req, res) => {
  const carts = await manager.getCarts()
  res.send(carts)
})

//agrega un prod al carrito corresp
router.post('/:cid/products/:pid', async (req, res) => {
  try {
      const cartId = req.params.cid
      const productId = req.params.pid
      const newCart = await manager.addProductById(cartId,productId,1)
      res.send({status: 'success', parameters: newCart.newCart, cart: newCart.cart})
  } catch (error) {
      res.status(401).send({status: 'error', message: error})
  }


})

router.delete('/:cid', async (req, res) =>{
  try{
      const cartId = req.params.cid
      const cleanedCart = await manager.cleanedCart(cartId)
      res.send({status: 'success', cleaned: cleanedCart})
  } catch (error) {
    res.status(401).send({status: 'error', error: 'Not found'})


  }
})

router.delete('/:cid/products/:pid', async (req, res) =>{
  try{
      const cartId = req.params.cid
      const prodId = req.params.pid
      const deletedProduct = await manager.deleteProduct(cartId, prodId)
      res.send({status: 'success', deleted: deletedProduct})
  } catch (error) {
    res.status(401).send({status: 'error', error: 'Not found'})

  }
})

router.put('/:cid', async (req, res) => {
  try{
      const cartId = req.params.cid
      const products = req.body
      const updatedCart = await manager.replaceCart(cartId,products)
      res.send({status: 'success', replaced: updatedCart})
  } catch (error) {
      res.status(401).send({status: 'error', error: 'Not found'})

  }
})

router.put('/:cid/products/:pid', async (req, res) => {
  try {
      const cartId = req.params.cid
      const prodId = req.params.pid
      const quantity = req.body.quantity
      const replacedQuantity = await manager.replaceProdQuantity(cartId, prodId, quantity)
      res.send({status: 'success', replacedQuantity: replacedQuantity})
  } catch (error) {
      res.status(401).send({status: 'error', error: 'Not found'})

  }

});

export default router;