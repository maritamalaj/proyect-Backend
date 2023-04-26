import mongoose from "mongoose";

const cartsCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: {
        type:[
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: Number
            }
            ],
        default: []
        },

});

cartSchema.pre('find', function(){
    this.populate('products.product')
});
cartSchema.pre('findOne', function(){
    this.populate('products.product')
});

const cartsModel = mongoose.model(cartsCollection, cartSchema);

export default cartsModel;