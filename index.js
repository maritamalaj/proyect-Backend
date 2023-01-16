const express = require('express');
const productRouter = require ('./routes/productsRouter');
const cartRouter = require ('./routes/cartsRouter')

//inst express
const app = express ();

//configuration
app.use(express.json());// to parce body
app.use (express.urlencoded({extended: true}));//VER

//routs
app.use ('/api/products', productRouter);
app.use ('/api/carts', cartRouter);

//inst server.
const PORT = 8080;
app.listen (PORT, ()=>{
    console.log (`Server listening on port ${PORT}`);
})



