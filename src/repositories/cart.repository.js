import CartDTO from "../dao/DTO/carts.dto.js";
import { ProductService, UserService, TicketService } from "./index.js";

class CartRepository{

    constructor(dao){
        this.dao = dao;
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
            const cartToAdd = new CartDTO();
            const newCart = await this.dao.create(cartToAdd)
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
    async purchaseCart(cartId){
        const cart = await this.getCartById(cartId);

        const outOfStock = []
        const purchase = []
        const ticket = {amount: 0}

        for (const product of cart.products) {
            if (product.product.stock >= product.quantity) {
                const remaining = product.product.stock - product.quantity
                await ProductService.updateProductById(product.product._id, {stock: remaining})
                purchase.push({product:product.product._id, quantity:product.quantity})
                ticket.amount += (product.product.price * product.quantity)
            } else {
                outOfStock.push(product.product._id)
            }
        }

        cart.products = cart.products.filter(product => outOfStock.includes(product.product._id)) 

        if (purchase.length > 0) {
            ticket.code = `${Date.now()}${Math.floor(Math.random()*100000)}`
            ticket.purchase_datetime = new Date()
            const user = await UserService.getOne({cart: cart._id})
            ticket.purchaser = user.email
            ticket.products = purchase
            await this.replaceCart(cart._id, cart.products)
            return {status:'success', ticket: await TicketService.create(ticket), messages: cart.products.length > 0 ?  {alert: 'Han quedado productos sin stock en el carrito', outOfStock} : null}
        }

        return {status:'error', error: 'No pudo realizarse ninguna compra por falta de Stock', messages: cart.products.length > 0 ?  {alert: 'Han quedado productos sin stock en el carrito', outOfStock} : null}
    }

}


//module.exports = ProductManager;

export default CartRepository;