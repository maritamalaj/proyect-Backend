import express from  'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import {Server} from 'socket.io'; //se crea apartit de un http
import mongoose from 'mongoose';

/* import session from 'express-session';
import MongoStore from 'connect-mongo'; */

import passport from 'passport';
import initializePassaport  from '../config/passport.config.js';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';


//import FileStore from 'session-file-store';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/cartsRouter.js';
import chatRouter from './routes/chat.router.js';
import {MessageService} from './repositories/index.js';
import sessionRouter from 'express-session';
import viewsRouter from '../routes/views.router.js'
import config from './config/config.js';

//import (morgan("dev"));

const app = express ();

const httpServer = app.listen(8080,()=>console.log ("listening en PORT 8080"));// solo el server http
const socketServer = new Server (httpServer)//servidor p socket 


app.use(express.json());// para parcear body
app.use (express.urlencoded({extended: true}));//VER
app.use(express.static(__dirname + '/public/'))


//config plantillas
app.engine ('handlebars', handlebars.engine()); //Inicial motor
app.set('views', __dirname+'/views') //indicamos donde estaran las vistas
app.set ('views engine', ' handlebears');//indicamos al motor inicializado q vamos a usar

app.use(express.static(__dirname+'/public'))
app.use(cookieParser('mySecret'));

//bycrypt
//generamos hash
/*export const createhash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10))
//validacion de contraseña
export const isValidPassword = (user, password) => {
    console.log(`datos a validar: user-password: ${user.password}, password: ${password}`);
    return bcrypt.compareSync (password, user.password)
}*/



mongoose.set({stricQuery:true})
mongoose.connect(config.MONGO_URI,{dbName: config.MONGO_DB_NAME}, async (error)=>{
    if (!error){

        console.log(`DB connected to ${config.MONGO_DB_NAME}`);
        const httpServer = app.listen(config.PORT, ()=>{
            console.log(`Server listening on port ${config.PORT}...`);
        });
        const socketServer = new Server (httpServer)

        let messages =[]
        socketServer.on ('connection', socket =>{
            console.log(socket.id);
            socket.on ('msg_front', data => console.log(data));
            socket.emit ('msg_back', "conectado al servicio, Bienvenido desde en back")

            /* socket.emit('msg_individual', 'Este msj solo lo recibe el socket')
            socket.broadcast.emit('msg_resto','Este msj lo recibe todos menos el socket actual')
            socketServer.emit('msg_all','Mensaje a todos') */

            socket.on('session', async data =>{// Esto es para que aparezcan los mensajes sin escribir nada antes, y despues de poner el usuario
                messages = await MessageService.get();
                socketServer.emit('first',messages)
            })
            
            socket.on('message', async data=>{
                await MessageService.create(data)
                messages = await MessageService.get();
                socketServer.emit('logs',messages)
                })
    })
    /*Seteamos el session express y su configuracion
    app.use(session({
        store: MongoStore.create({
            mongoUrl: config.MONGO_URI,
            dbName: congfig.MONGO_DB_NAME
        }),
        secret: 'the_secret',
        resave: true,
        saveUninitialized: true
    }))*/

    //inicilizamos passport
    initializePassaport();
    app.use(passport.initialize());
   /*         app.use(passport.session()); */

    //Utilizamos este Middleware genérico para enviar la instancia del servidor de Socket.io a las routes
    app.use((req,res,next)=>{
            req.io = socketServer
            next()
        })
    app.use('/api/products', productsRouter)
    app.use('/api/carts', cartsRouter)
    app.use('/api/chat', chatRouter)
    app.use('/session', sessionRouter)
    app.use('/views', viewsRouter)

    app.get('/',(req, res) =>{
        res.redirect('views/products')
    }
    )
   } else {
    console.log("Can't connect to database");
   }
})




