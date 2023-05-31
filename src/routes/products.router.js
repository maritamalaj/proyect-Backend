import { Router } from 'express';
import ProductManager from '../managers/product.manager.js';
const router = Router()

// class
const manager = new ProductManager ();


//endpoint Get - list of products
router.get ('/products', async (req,res) =>{
     let {limit, page, query, sort} = req.query
     const products = await manager.getProducts(limit, page, sort, query)
     req.io.emit('updatedProducts', products);
     res.send(products)
})

// show product data
router.get ('/products/p:id', async (req, res) =>{
    const id = req.params.pid
    const product = await manager.getProductById(id)
    res.send(product)
})

//add new prod
router.post ('/', async (req, res)=>{
    const {title, description, price, thumbnails, code, stock, category, status} = req.body
    const addProduct = await manager.addProduct (title, description, price, code, stock, category, status, thumbnails)
    res.send(addProduct)
})

// change  prod
router.put('/:pid', async (res,req)=>{
    const id = req.params.pid
    const {title, description, price, thumbnails, code, stock, category, status} = req.body
    const updateProduct = await manager.updateProductById (id, title, description, price, code, stock, category, status, thumbnails)
    res.send (updateProduct)

})


//delete  prod
router.delete ('/:pid', async (res,req)=>{ 
    const id = req.params.pid
    const deleteProduct =  await manager.deleteProductById(id)
    req.io.emit('updatedProducts', await manager.getProducts());
    res.send(deleteProduct)
 

})


module.exports = router;