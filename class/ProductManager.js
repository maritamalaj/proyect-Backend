const fs = require('fs');



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


module.exports = ProductManager;


