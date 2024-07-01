import CONFIG from './config/config.js'
import cors from 'cors';
import express from 'express'
import session from 'express-session'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import MongoStore from 'connect-mongo'
import handlebars from 'express-handlebars'
import ProductManagerMongo from './controllers/ProductManagerMongo.js'
import ChatManagerMongo from './controllers/ChatManagerMongo.js'
import initializePassport from './passport/passport.js'
import initializePassportGithub from './passport/passport.github.js'
import passport from 'passport'
import { createServer } from 'http'; // Importa createServer desde http
import { Server } from 'socket.io'
import Database from './models/db/db.js'
const PORT = CONFIG.PORT
const HOST = CONFIG.HOST
const PROTOCOL = CONFIG.PROTOCOL
import compression from 'express-compression'
import { addLogger } from './config/logger.js'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpecs } from './utils/swaggerSpecs.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(session({
    store: MongoStore.create({
        mongoUrl: CONFIG.MONGO_URL
    }),
    secret: 'secretEcommerce',
    resave: true,
    saveUninitialized: true
}))


let msjs = []

let prod = new ProductManagerMongo
let chat = new ChatManagerMongo

import routerProduct from './routes/products.route.js'
import routerCart from './routes/carts.route.js'
import routerHome from './routes/home.router.js'
import routerRealtime from './routes/realtime.route.js'
import routerChat from './routes/chat.route.js'
import routerProducts from './routes/productsPaginate.route.js'
import routerCartList from './routes/cartList.route.js'
import routerViews from './routes/views.route.js'
import routerUsers from './routes/users.route.js'
import routerStart from './routes/start.route.js'
import routerMocking from './routes/mocking.route.js'
import routerLog from './routes/log.route.js'

//SERVER HTTP
const server = createServer(app)

//PUBLIC
app.use(express.static(__dirname+"/public"))

// Define el helper eq que se usa para el paginado
const handlebarsHelpers = {
    eq: function(arg1, arg2, options) {
        if (arg1 === arg2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    }
};

//ENGINE
app.engine('handlebars', handlebars.engine({
    helpers: handlebarsHelpers // Registra los helpers
}));
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

//Middleware para pasar variables de entorno a todas las vistas
app.use((req, res, next) => {
    res.locals.protocol = PROTOCOL;
    res.locals.apiHost = HOST;
    res.locals.apiPort = PORT;
    next();
});
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(compression())
app.use(addLogger)

initializePassport()
initializePassportGithub()
app.use(passport.initialize())

//ROUTES
app.use('/home', routerHome)
app.use('/api/product', routerProduct)
app.use('/api/cart', routerCart)
app.use('/realtimeproducts', routerRealtime)
app.use('/chat', routerChat)
app.use('/products', routerProducts)
app.use('/cart', routerCartList)
app.use('/view', routerViews)
app.use('/api/users', routerUsers)
app.use('/', routerStart)
app.use('/mockingproducts', routerMocking)
app.use('/loggertest', routerLog)

//DOCUMENTATION
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

function realizarLlamadaPOST(url, datos) {
    return new Promise((resolve, reject) => {
        const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
        };
  
        fetch(url, opciones)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error en la llamada POST en promise');
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
        });
    });
}

async function getAllProducts(){
    try {
        let resultado = await prod.getProducts(100,1,1,null)
        return resultado.payload
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

//SOCKET SERVER
const io = new Server(server)
io.on('connection', (socket)=> {
    console.log('cliente conectado')

    socket.on('product-add', async (data)=> {
        try{
            await realizarLlamadaPOST(`${PROTOCOL}://${HOST}:${PORT}/api/product/`, data);
            let products = await getAllProducts()
            io.sockets.emit('products-update', products);
            } catch (error) {
                console.error('Error en la llamada POST:', error);
            };
        });

    /*START CHAT*/
    socket.emit('Mensaje1', 'Bienvenido')

    socket.on('Mensaje2', (data)=>{
        console.log(data)
    })

    socket.on('MensajeNuevo', (data)=>{
        console.log(data)
        msjs.push(data)
        chat.AddMessage(JSON.stringify(data))
        io.sockets.emit('MensajesDelChat', msjs)
    })
    /*END CHAT*/
})
  
server.listen(PORT, ()=> {
    console.log(`Servidor corriendo en ${PROTOCOL}://${HOST}, puerto ${PORT}`)
    Database.connect()
})
