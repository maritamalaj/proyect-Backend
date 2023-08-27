import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnails: {
        type: Array, 
        default:[]
    },
    code: Number,
    stock: Number,
    category: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },

    owner: {
        type: String,
        default: "admin"
    }
});

productsSchema.plugin(mongoosePaginate)

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;