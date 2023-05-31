import fs from 'fs';

class CartManager{
    constructor (path){
        this.path = path;
        this.carts = new Array ();
        this.format = 'utf-8';
      
    }


    getCarts = async () => {
      try{
          let content=await fs.promises.readFile(this.path,this.format)
          this.carts = JSON.parse(content)
          return this.carts
      }
      catch(err){
          return "Can't reach carts"
      }
      
  }

  getNextId(){
      let size = this.carts.length
      return size > 0 ? this.carts[size-1].id + 1 : 1 
  }   

  async addCart(){
      await this.getCarts()
      const newCart={
          id: this.getNextId(),
          products: new Array()
      }
      return (this.carts.push(newCart), await fs.promises.writeFile(this.path, JSON.stringify(this.carts)), newCart)
  }


  getCartById = async (id) => {
      await this.getCarts()
      return this.carts.find(cart => cart.id == id) || "Cart Id not found";
      
  }
  
  addProductById = async (cartId,productId,quantity) => {
      const cart = await this.getCartById(cartId) 
      const product = cart.products?.find(product => product.product == productId)
      if (!product) cart.products?.push({product: productId, quantity: quantity})
      else product.quantity += quantity
      return (await fs.promises.writeFile(this.path, JSON.stringify(this.carts)),cart)
      
  }

}


//module.exports = CartManager;
export default CartManager;