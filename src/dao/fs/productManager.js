import fs from 'fs';

class ProductManager{
    constructor(){
        this.products=new Array();
        this.path="product.json";
        this.format = 'utf-8';
    }

    get = async (querySearch='', limit='', page='', sortChoosen='') => {
        try{
            console.log(this.path);
            let content=await fs.promises.readFile(this.path,this.format)
            this.products = JSON.parse(content)
            return {docs:this.products}
        }
        catch(err){
            return "Can't reach products"
        }
    } 
    getOne = async (id) => {
        await this.get()
        return this.products.find(product => product.id == id) || "Product Id not found";   
    } 
    getOther = async (other) => {
        await this.get()
        return this.products.find(product => product.id == id) || "Product Id not found";         
    } 
    create = async (product)=>{
        await this.get()
        const newProduct= this.#newProduct(this.getNextId(), ...product)
        const errors = this.#errorCheck(newProduct,"add")
        return errors.length == 0 ? (this.products.push(newProduct), await fs.promises.writeFile(this.path, JSON.stringify(this.products)),newProduct) : {error: errors}       
    }
    update= async (id,product) => {
        const index = await this.#getIndex(id)
        const updatedProduct= this.#newProduct(id,...product)
        const errors = this.#errorCheck(updatedProduct, "update")
        if (!index) errors.push("Product Id not found")
        return errors.length == 0 ? (this.products[index]=updatedProduct, await fs.promises.writeFile(this.path, JSON.stringify(this.products)),updatedProduct) : errors
    }   
    delete = async (id) => {
        const index = await this.#getIndex(id)
        if (index) return (this.products.splice(index, 1), await fs.promises.writeFile(this.path, JSON.stringify(this.products)),{message: "Success"})
        else return {error: "Product Id not found"}       
    }

    getNextId(){
        let size = this.products.length
        return size > 0 ? this.products[size-1].id + 1 : 1 
    }   
    #newProduct(id,title,description,price,code,stock, category, status, thumbnails){
        const newProduct={
            id: id,
            title,
            description,
            price,
            thumbnails,
            code,
            stock,
            category,
            status
        }
        return newProduct;
    }
    #errorCheck(newProduct, operation){
        const errors=new Array();
        if (operation == "add") {
            this.products.forEach(element => {if (element.code == newProduct.code) errors.push(`Code "${newProduct.code}" already exists`)})
        }
        if (Object.values(newProduct).includes(undefined)) errors.push('There are empty fields.')
        return errors
    }

    async #getIndex(id){
        let index;
        let product = await this.getOne(id)              
        if (product != "Product Id not found") index=this.products.indexOf(product) 
        else return; 
        return index
    }

   
}

//module.exports = ProductManager;
export default ProductManager;