class ProductManager {
    
    constructor() {
      this.products = [];
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        const product={
            id: this.products.lenth +1,
            title,
            description,
            price, 
            thumbnail, 
            code, 
            stock,

        }
      if (title === undefined || description === undefined || price === undefined || thumbnail === undefined || code===undefined|| stock===undefined){
        return console.log ("todos los campos son obligatorios");

      }

      let isInCart = this.products.find ((product) => product.code === code);
      if (isInCart){
        return console.log ("el producto ya existe");

      }else{
        this.products.push (product);

      }
    
    }

    getProducts() {
        return this.products;
    }
    getProductById(id) {
     let searchId = id;
     let myproduct =null;
     this.products.forEach ((product)=>{
      if (product.id === searchId){
        myproduct = product;
      }
     });
     if (myproduct === null){
      return console.log ("Not Found");

     }else{
      return myproduct;

     }
    }
  };


  const productManager = new ProductManager();
  productManager.addProduct(
    "espejo",
    "espejo redondo de yute 60cm",
    3500,
    "img.espejoyute", 
    "esp1",
    5,
  );

  productManager.addProduct(
    "manta",
    "manta pie de cama de tussor y borlas 50x300  cm",
    5500,
    "img.manta", 
    "manta1",
    5,
  );

  productManager.addProduct(
    "tapiz",
    "tapiz en macrame crudo 30x50cm",
    4500,
    "img.tapiz", 
    "tapiz1",
    5,
  );

const productoDeco = productManager.getProducts();
console.log (productoDeco);


productManager.getProductById();


