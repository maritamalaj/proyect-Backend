import  express  from 'express';
import productRouter from './routes/productsRouter';
import cartRouter from './routes/cartsRouter';

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



/*const ProductManager = require ("../class/ProductManager");
const [espejo, manta, tapiz] = require ("./products");

const products = new productManager ("./database/db.json");

// Get all products
// products.getProducts(); // []

// Add product
// products.addProduct(espejo); //         espejo

// Get all products. Now we have 1 product.
// products.getProducts(); // [Espejo, manta, tapiz]

// Get product by id
// products.getProductById(1); // espejo

// Update product by id
// products.updateProduct(2, { stock: 40 }); // Updated

// Delete product by id
// products.deleteProductById(2); // Deleted

// Delete all products
// products.deleteAll(); // Deleted*/