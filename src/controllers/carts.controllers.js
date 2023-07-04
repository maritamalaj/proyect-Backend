import { CartService, TicketService } from "../repositories/index.js";

export const addCart = async (req,res) => {
    const newCart = await CartService.addCart()
    res.send(newCart)
}

export const getCartById = async (req, res) => {
    try {
        const cartId = req.params.cid
        const selCart = await CartService.getCartById(cartId)
        res.send(selCart)
    } catch (error) {
        res.status(401).send({status: 'error', error: 'Not found'})
    }
}

export const getCarts = async (req, res) => {
    const carts = await CartService.getCarts()
    res.send(carts)
}

export const addProductById = async (req, res, next) => { // Se Agregó el try catch y el next, porque sino , no pasaba el custom error al errohandler y crasheaba la app 
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const newCart = await CartService.addProductById(cartId,productId,1)
        res.send({status: 'success', parameters: newCart.newCart, cart: newCart.cart})
    } catch (error) {
        next(error)
        /* res.status(401).send({status: 'error', message: error}) */
    }
}

export const cleanCart = async (req, res) => {
    try{
        const cartId = req.params.cid
        const cleanedCart = await CartService.cleanedCart(cartId)
        res.send({status: 'success', cleaned: cleanedCart})
    } catch (error) {
        res.status(401).send({status: 'error', error: 'Not found'})

    }
}

export const deleteProductFromCart = async (req, res) => {
    try{
        const cartId = req.params.cid
        const prodId = req.params.pid
        const deletedProduct = await CartService.deleteProduct(cartId, prodId)
        res.send({status: 'success', deleted: deletedProduct})
    } catch (error) {
        res.status(401).send({status: 'error', error: 'Not found'})

    }
}

export const replaceCart = async (req, res) => {
    try{
        const cartId = req.params.cid
        const products = req.body
        const updatedCart = await CartService.replaceCart(cartId,products)
        res.send({status: 'success', replaced: updatedCart})
    } catch (error) {
        res.status(401).send({status: 'error', error: 'Not found'})

    }
}

export const replaceProductQuantity = async (req, res) => {
    try {
        const cartId = req.params.cid
        const prodId = req.params.pid
        const quantity = req.body.quantity
        const replacedQuantity = await CartService.replaceProdQuantity(cartId, prodId, quantity)
        res.send({status: 'success', replacedQuantity: replacedQuantity})
    } catch (error) {
        res.status(400).send({status: 'error', error: 'Not found'})

    }
}

export const purchaseCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const ticket = await CartService.purchaseCart(cartId)
        res.send(ticket)
    } catch (error) {
        req.logger.fatal(error);
        res.status(400).send({status: 'error', error: 'Not found'})
    }

}