import CartMongo from "../dao/db/cart.mongo.js";
import CartFs from "../dao/fs/cartmanager.js";



class CartManager{

    constructor(){
        this.dao = new CartMongo()
    }

    getCarts = async () => {
       try {
            let content=await this.dao.get();
            return content
       } catch (error) {
            return 'Manager - Cannot reach carts'
       }
    }

    addCart = async () => {
        try{
            const newCart = await this.dao.create()
            return newCart
        } catch(err){
            return 'Manager - Cannot create cart'
        }

    }

    getCartById = async (id) => {
        const cartById = await this.dao.get(id)
        return cartById || "Manager - Cart Id not found";

    }

    addProductById = async (cartId,productId,quantity) => {
        const cart = await this.getCartById(cartId) 
        const product = cart.products?.find(product => product.product._id == productId)
        let newCart;
        if (!product) cart.products?.push({product: productId, quantity: quantity}), newCart = await this.dao.update(cartId, productId, quantity, false);
        else product.quantity += quantity, newCart = await this.dao.update(cartId, productId, product.quantity, true); 

        return {newCart, cart}

    }

    async cleanedCart(cartId) {
        await this.dao.clean(cartId);
        return await this.getCartById(cartId);
    }

    async deleteProduct(cartId, prodId) {
        await this.dao.delete(cartId,prodId);
        return await this.getCartById(cartId);
    }

    async replaceCart(cartId, products){
        await this.dao.replace(cartId, products);
        return await this.getCartById(cartId);
    }

    async replaceProdQuantity(cartId, prodId, quantity){
        await this.dao.update(cartId, prodId, quantity, true); 
        return await this.getCartById(cartId);
    }

}
//module.exports = ProductManager;

export default CartManager;