import { ProductService } from "../repositories/index.js";

export const getProducts = async (req, res) => {
    let {limit, page, query, sort} = req.query
    const products = await ProductService.getProducts(limit, page, sort, query)
    req.io.emit('updatedProducts', products.payload);
    res.send(products)
}

export const getProductById = async (req, res) => {
    const id = req.params.pid
    const product = await ProductService.getProductById(id)
    res.send(product)
}

export const addProduct = async (req, res) => {
    const {title, description, price, thumbnails, code, stock, category, status} = req.body
    const addProduct = await ProductService.addProduct(title, description, price, code, stock, category, status, thumbnails)
    req.io.emit('updatedProducts', await ProductService.getProducts());
    res.send(addProduct)
}

export const updateProductById = async (req, res) => {
    const id = req.params.pid
    const product = req.body
    const updateProduct = await ProductService.updateProductById(id, product)
    req.io.emit('updatedProducts', await ProductService.getProducts());
    res.send(updateProduct)
}

export const deleteProduct = async (req, res) => {
    const id = req.params.pid
    const deleteProduct =  await ProductService.deleteProductById(id)
    req.io.emit('updatedProducts', await ProductService.getProducts());
    res.send(deleteProduct)
}