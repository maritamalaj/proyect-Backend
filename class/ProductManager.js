import fs from 'fs';

class ProductManager{
  constructor (path){
    this.products=new Array ();
    this.path=path;
    this.format = 'utf-8'; 
  }

  getNextId (){
    let size =this.products.length
    return size >0? this.products[size-1].id + 1 : 1
  }
  #newProduct (id,title,description,price,code,stock, category, status, thumbnails){
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
    const errors=new Array()
    if (operation == "add"){
      this.products.forEach(element=>{ if (element.code==newProduct.code)errors.push(`code "${newProduct.code}"already exist`)})
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

  export default ProductManager;















/*const fs = require('fs');



class ProductManager {
   constructor(path) {
      this.path = path;
    }
    
     //method (priv): readFile and return content
    async #readFile (){
      try{
        const data = await fs.promises.readFile (this.path, 'utf-8');
        const parseData = JSON.parse(data);
        return parseData;
      } catch (error){
      console.log(error);
      }
    }

    //method (priv) check prod exist
    async #checkCode (code){
      const fileData= await this.#readFile();
      return fileData.find ((objeto) => objeto.code === code);
    }

    //method (publ): add product
    async addProduct (obj){
      const fileData = await this.#readFile();
      if (await this.#checkCode (obj,code)) return console.log (`error: product ${obj.code} exist`)
        
      try{
       if (fileData.length !==0) await fs.promises.writeFile(this.path, JSON.stringify ([...fileData, {...obj, id: fileData [fileData.length -1].id+1},],null,2),"utf-8");
       else await fs.promises.writeFile(this.path, JSON.stringify([{...obj, id:1}]),"utf-8");
      }catch(error){
        console.log (error);
      }

    }

     //method (Publ): get all product


    async getProducts() {
      const fileData = await this.#readFile();

        try{
          if (fileData.length === 0 ) throw new Error (`Error: not found product`);
          else console.log (fileData);
        }catch (error){
          console.log (`Error:product not found`);
        }

        //consulta a archivo products (desf 3)
       return JSON.parse(fs.readFileSync(this.path,"utf-8"));

      }

     
    // method (publ): get product by id

    async getProductById(id) {
      try{
        const fileData = await this.#readFile();

        if (!fileData.find ((objeto)=> objeto.id === id))throw new Error (`error: product not found ${id}.`);
        else console.log(fileData.find((objeto) => objeto.id === id));      
      } catch (error) {
        console.log (`error: product not found ${id}.`);
      }  
    }

    // method (publ): update product by id
      async updateProduct (id,obj){
        try{
          const fileData = await this.#readFile();
          const update = fileData.map ((producto)=> producto.id === id ? {...producto, ...obj}:producto);
          if (!fileData.find ((objeto) => objeto.id === id))throw new Error (`error: Not found product ${id}.`);
          else await fs.promises.writeFile (this.path, JSON.stringify (update,null,4));
        }catch (error){
          console.log(`Error:  update product ${id}.`);

        }
      }
  //method (publ) delete prod by id
  async deleteProductById (id){
    try{
      const fileData = await this.#readFile ();
      const update = fileData.filter ((producto) =>producto.id !== id);

      if (!fileData.find ((objeto) =>objeto.id === id)) throw new Error (`error: Not found product ${id}.`);
      else await fs.promises.writeFile(this.path, JSON.stringify(update, null, 4)); 
    } catch (error) {
      console.log(`Error: cant delete product ${id}.`);
    }
  }
    
//method (publ) delete all
async deleteAll(){
  await fs.promises.writeFile(this.path, JSON.stringify ([]), 'utf-8');
}
}  


module.exports = ProductManager;*/


