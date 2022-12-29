const ProductManager = require ("./class/ProductManager");
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
// products.deleteAll(); // Deleted