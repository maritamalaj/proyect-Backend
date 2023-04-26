import { Router } from "express";
const router = Router()
import ProductManager from '../dao/managers/db/productManager.js'
import CartManager from '../dao/managers/db/cartManager.js';
const productManager = ProductManager();
const cartManager = CartManager();

router.get ('/products', async (req,res)=>{
    let limit = req.query.limit
    let page = req.query.page
    let query = req.query.query
    let sort = req.query.sort

    const products = productManager.getProducts (limit,page, sort, query)
    res.render('product-pages',{products, user: req.session?.user})
     req.io.emit('updatedProducts', products);

})

router.get('/products/:pid', async (req, res) => {
     const id = req.params.pid
     const product = await productManager.getProductById(id)
     if (!product?.error) res.render('product-detail',{product, user: req.session?.user})
     else res.status(404).send(product.error)
})

router.get('/home', async (req, res) =>{
     const products = await productManager.getProducts()
     res.render('home',
     {
         title: "Lista de Productos",
         products: products.payload,
         user: req.session?.user
     })
})

router.get('/realtimeproducts', async (req, res) =>{
     const products = await productManager.getProducts()
     res.render('realTimeProducts',
     {
         title: "Lista de Productos",
         products: products.payload,
         user: req.session?.user
     })

})

router.get('/carts/:cid', async (req, res) => {
     try {
         const cartId = req.params.cid
         const selCart = await cartManager.getCartById(cartId)
         res.render('cart-detail', {selCart, user: req.session?.user})
     } catch (error) {
         res.status(401).render('cart-detail', {status: 'error', error: 'Not found'})
     }

})

router.get('/login',(req, res)=>{
     res.render('session-views/login')
})

router.get('/register',(req, res)=>{
     res.render('session-views/register')
})

export default router;

