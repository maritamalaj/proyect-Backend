
const express = require("express");
const routerProducts = express.Router();
import { Router } from 'express';
import ProductManager from '../class/ProductManager';
const router = Router()

// class
const manager = new ProductManager ('.products.json');


//list of prod
router.get ('/products', async (req,res) =>{
    const products = await manager.getProducts()
        let limit = req.query.limit
        if (!limit) res.send ({products})
        else{
            const prodLimit = [];
            if (limit >products.length)limit = products.length;
            for (let index = 0; index< limit; index++){
                prodLimit.push(products[index]);
            }
            res.send({prodLimit})
        }
    
})

// show product data
router.get ('/products/p:id', async (req, res) =>{
    const id = req.params.pid
    const product = await manager.getProductById(id)
    res.send({product})
})

//add new prod
router.post ('/', async (req, res)=>{
    const {title, description, price, thumbnails, code, stock, category, status} = req.body
    const addProduct = await manager.addProduct (title, description, price, code, stock, category, status, thumbnails)
    res.send(addProduct)
})

// change  prod
router.put('/:pid', async (res,req)=>{
    const id=parentInt (req.params.pid)
    const {title, description, price, thumbnails, code, stock, category, status} = req.body
    const updateProduct = await manager.updateProductById (id, title, description, price, code, stock, category, status, thumbnails)
    res.send (updateProduct)

})


//delete  prod
router.delete ('/:pid', async (res,req)=>{ 
    const id = parseInt (req.params.pid)
    const deleteProduct = await manager.deleteProductById(id)
    res.send (deleteProduct)

})
export default router;