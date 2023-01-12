import fs from 'fs';

class CartManager{
    constructor (path){
        this.path = path;
      
    }


    //method (priv): readFile and return content
    async #readFile (){
        try{
          const cart = await fs.promises.readFile (this.path, 'utf-8');
          const parseCart = JSON.parse(cart);
          return parseCart;
        } catch (error){
        console.log(error);
        }
    }

    //method (priv) check prod exist
    async #checkCode (code){
        const fileCart= await this.#readFile();
        return fileCart.find ((objeto) => objeto.code === code);
    }

    //method (publ): add cart
    async addCart (obj){
        const fileCart = await this.#readFile();
        if (await this.#checkCode (obj,code)) return console.log (`error: product ${obj.code} exist`)
          
        try{
         if (fileCart.length !==0) await fs.promises.writeFile(this.path, JSON.stringify ([...fileCart, {...obj, id: fileCart [fileCart.length -1].id+1},],null,2),"utf-8");
         else await fs.promises.writeFile(this.path, JSON.stringify([{...obj, id:1}]),"utf-8");
        }catch(error){
          console.log (error);
        }
    }

 // method (publ): get product by id

    async getCartById(id) {
        try{
          const fileCart = await this.#readFile();
  
          if (!fileCart.find ((cart)=> cart.id === id))throw new Error (`error: product not found ${id}.`);
          else console.log(fileCart.find((cart) => cart.id === id));      
        } catch (error) {
          console.log (`error: product not found ${id}.`);
        }  
    }

    async addProductById (cartId,productId,quantity) {
       try {
        const fileCart = await this.#readFile();
         
        if (!fileCart.find ((product=> product: productId,quantity:quantity === productId))throw new Error (`error: product not found ${productId}.`);
          else console.log(fileCart.find((product) => product.quantity += quantity));      
        } catch (error) {
          console.log (`error: product not found ${productId}.`);
        } 
       
    }
}

export default CartManager;