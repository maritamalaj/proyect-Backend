import { CartService, ProductService } from '../repositories/index.js';


export const getProductsView = async (req, res) => {
    let {limit, page, query, sort} = req.query
    const products = await ProductService.getProducts(limit, page, sort, query)
    req.io.emit('updatedProducts', products.payload);
    res.render('product-pages',{products, user: req.user?.user})
}

export const getProductByIdView = async (req, res) => {
    const id = req.params.pid
    const product = await ProductService.getProductById(id)
    if (!product?.error) res.render('product-detail',{product, user: req.user?.user})
    else res.status(404).send(product.error)
}

export const homeView = async (req, res) => {
    const products = await ProductService.getProducts()
    res.render('home',
    {
        title: "Lista de Productos",
        products: products.payload,
        user: req.user?.user
    })
}

export const realtimeProductsView = async (req, res) => {
    const products = await ProductService.getProducts()
    res.render('realTimeProducts',
    {
        title: "Lista de Productos",
        products: products.payload,
        user: req.user?.user
    })

    setTimeout(()=>{
        req.io.emit('track','')
        console.log(req.io.allSockets()); 
    },1000) 
}

export const cartDetail = async (req, res) => {
    try {
        const cartId = req.params.cid
        const selCart = await CartService.getCartById(cartId)
        res.render('cart-detail', {selCart, user: req.user?.user})
    } catch (error) {
        res.status(401).render('cart-detail', {status: 'error', error: 'Not found'})
    }
}

export const loginView = async (req, res) => {
    res.render('session-views/login')
}
export const registerView = async (req, res) => {
    res.render('session-views/register')
}
export const failRegisterView = async (req, res) => {
    res.render('session-views/register',{error:'Error al registrarse'})
}
export const failLoginView = async (req, res) => {
    res.render('session-views/login',{error:'Error al loguearse'})
}