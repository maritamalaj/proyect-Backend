import fs from 'fs';

class ProductManager{
    constructor(path){
        this.products=new Array();
        this.path=path;
        this.format = 'utf-8';
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
        let product = await this.getProductById(id)              
        if (product != "Product Id not found") index=this.products.indexOf(product) 
        else return; 
        return index
    }

    async addProduct(title,description,price,code,stock, category, status = true, thumbnails = []){
        await this.getProducts()
        const newProduct= this.#newProduct(this.getNextId(),title,description,price,code,stock, category, status, thumbnails)
        const errors = this.#errorCheck(newProduct,"add")
        return errors.length == 0 ? (this.products.push(newProduct), await fs.promises.writeFile(this.path, JSON.stringify(this.products)),newProduct) : {error: errors}

    }

    getProducts = async () => {
        try{
            let content=await fs.promises.readFile(this.path,this.format)
            this.products = JSON.parse(content)
            return this.products
        }
        catch(err){
            return "Can't reach products"
        }

    }

    getProductById = async (id) => {
        await this.getProducts()
        return this.products.find(product => product.id == id) || "Product Id not found";

    }

    updateProductById = async (id,title,description,price,code,stock, category, status = true, thumbnails = []) => {
        const index = await this.#getIndex(id)
        const updatedProduct= this.#newProduct(id,title,description,price,code,stock, category, status, thumbnails)
        const errors = this.#errorCheck(updatedProduct, "update")
        if (!index) errors.push("Product Id not found")
        return errors.length == 0 ? (this.products[index]=updatedProduct, await fs.promises.writeFile(this.path, JSON.stringify(this.products)),updatedProduct) : errors

    }

    deleteProductById = async (id) => {
        const index = await this.#getIndex(id)
        if (index) return (this.products.splice(index, 1), await fs.promises.writeFile(this.path, JSON.stringify(this.products)),{message: "Success"})
        else return {error: "Product Id not found"}

    }
}

//module.exports = ProductManager;
export default ProductManager;