import productsModel from './models/products.model.js';

class ProductMongo{


    get = async (querySearch='', limit='', page='', sortChoosen='') => {
        return await productsModel.paginate(querySearch,{limit: limit || 10, page: page || 1, sort:sortChoosen, lean : true});
    } 
    getOne = async (id) => {
         return await productsModel.findOne({_id:id}).lean().exec();        
    } 
    getOther = async (other) => {
        return await productsModel.findOne(other).lean().exec();        
    } 
    create = async (newProduct)=>{
        return await productsModel.create(newProduct)        
    }
    update= async (id,updatedProduct) => {
        return await productsModel.updateOne({_id:id},{$set: updatedProduct})
    }    
    delete = async (id) => {
        return await productsModel.deleteOne({_id:id})        
    }

}

//module.exports = ProductManager;

export default ProductMongo;