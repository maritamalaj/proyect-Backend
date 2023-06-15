import config from '../config/config.js';

export let ProductDAO
export let CartDAO
export let UserDAO
export let MessageDAO
export let TicketDAO

switch (config.DAO_MODE){
    case 'MONGO':
        console.log('mongo database');

        const {default : ProductMongo } = await import ('../dao/db/product.mongo.js')
        const {default : CartMongo} = await import ('../dao/db/cart.mongo.js')
        const {default : UserMongo} = await import ('../dao/db/user.mongo.js')
        const {default : MessageMongo} = await import ('../dao/db/message.mongo.js')
        const {default : TicketMongo} = await import ('../dao/db/ticket.mongo.js')

        ProductDAO=ProductMongo
        CartDAO=CartMongo
        UserDAO=UserMongo
        MessageDAO=MessageMongo
        TicketDAO=TicketMongo

        break;
    
    case 'Fs':
        console.log('FileSystem database');

        const {default : ProductManager} = await import ('../dao/fs/productManager.js')
        const {default : CartManager} = await import ('../dao/fs/cartManager.js')
        const {default : UserManager} = await import ('../dao/db/user.mongo.js')
        const {default : MessageManager} = await import ('../dao/db/message.mongo.js')
        const {default : TicketManager} = await import ('../dao/db/ticket.mongo.js')

        ProductDAO=ProductManager
        CartDAO=CartManager
        UserDAO=UserManager
        MessageDAO=MessageManager
        TicketDAO=TicketManager

        break;
    default:
        break;
        
}