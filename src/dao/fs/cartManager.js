import fs from 'fs';

class CartManager{
    constructor(){
        this.carts=new Array();
        this.path="cart.json";
        this.format = 'utf-8';
    }

    get = async (id = '') => {
        try{
            let content=await fs.promises.readFile(this.path,this.format)
            this.carts = JSON.parse(content)
            return this.carts
            return await this.carts.find(cart => cart.id == id) || "Cart Id not found";
        }
        catch(err){
            return "Can't reach carts"
        }

    }

    create= async () => {
        await this.get()
        const newCart={
            id: this.getNextId(),
            products: new Array()
        }
        return (this.carts.push(newCart), await fs.promises.writeFile(this.path, JSON.stringify(this.carts)), newCart)
    }


    update = async (cartId,productId,quantity, exists) => {
        const cart = await this.get(cartId) 
        if (exists == false) cart.products?.push({product: productId, quantity: quantity})
        else product.quantity += quantity
        return (await fs.promises.writeFile(this.path, JSON.stringify(this.carts)),cart)
    }

    clean = async (cartId) => {
        const cart = await this.get(cartId) 
        cart.products = []
        return await (await fs.promises.writeFile(this.path, JSON.stringify(this.carts)),cart)
    }

    delete = async (cartId, prodId) => {
        const cart = await this.get(cartId) 
        const carts = await this.get()
        const index = cart.products.findIndex(product=>{product.id==prodId})
        carts.splice(1, index)
        return await (await fs.promises.writeFile(this.path, JSON.stringify(this.carts)),cart)
    }

    replace = async (cartId, products)=>{
        const cart = await this.get(cartId) 
        cart.products = products
        return await (await fs.promises.writeFile(this.path, JSON.stringify(this.carts)),cart)
    }

    getNextId(){
        let size = this.carts.length
        return size > 0 ? this.carts[size-1].id + 1 : 1 
    }   
}
//module.exports = ProductManager;

export default CartManager;