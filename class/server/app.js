import express from  ('express');
import productRouter from '../../routes/productsRouter';
import cartRouter from '../../routes/productsRouter';

const app = express ();

app.use(express.json());// para parcear body
app.use (express.urlencoded({extended: true}));//VER

app.use ('/api/products', productRouter);
app.use ('/api/carts', cartRouter);

app.listen (8080, ()=>{
    console.log ("Server listening on port 8080...");
})





/*const express = require ('express');
const res = require('express/lib/response');
const app = express();
const ProductManager = require ("../ProductManager");
const PORT = 8080
const router = express.Router();

app.use ('/compras', routerCompras);

const productManager = ProductManager("../products/index.json")

app.get ("/", async (req, res)=> {
    const products = await productManager.getProducts();
    const {limit} = req.query
    if (limit) return res.json(products.slice(0,limit));
    else return res.json(products);
});

app.get("/products/:pid", async (req,res)=>{
    const products = await productManager.getProducts();
    const {pid} = req.parms
    const product = products.find (product => product.id === pid);

    if (product) return res.status(200).json(product);
    else return res.status(404).json ({message : "product not found"});

});

app.listen(PORT,()=>{
    console.log (`Server runing en port http://localhost:${PORT}`);

});*/