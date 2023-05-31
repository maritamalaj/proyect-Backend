import cartsModel from './models/carts.model.js';

class CartMongo{

    get = async (id = '') => {
       try {
            if (!id) return await cartsModel.find().lean().exec();
            return await cartsModel.findOne({_id:id}).lean().exec()
       } catch (error) {
            return 'MONGO DAO - Cannot get data'
       }
    }

    create= async () => {
        try{
            return await cartsModel.create({products:[]})
        } catch(err){
            return 'MONGO DAO - Cannot create data'
        }
    }

    update = async (cartId,productId,quantity, exists) => {

        if (exists == false) return await cartsModel.updateOne({_id:cartId},{$push: {products: {product: productId, quantity: quantity}}});
        else return await cartsModel.updateOne({_id: cartId, 'products.product':productId}, {$set: {'products.$.quantity': quantity}}); 
    }

    clean = async (cartId) => {
        return await cartsModel.updateOne({_id:cartId},{products:[]});
    }

    delete = async (cartId, prodId) => {
        return await cartsModel.updateOne({_id:cartId},{$pull: {products: {product: prodId}}});
    }

     replace = async (cartId, products)=>{
        return await cartsModel.updateOne({_id:cartId},{products:products});
    }

}
//module.exports = ProductManager;

export default CartMongo;