const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const handlebars = require('express-handlebars')
const ProductManagerMongo = require('./dao/db/managers/ProductManagerMongo')
const ChatManagerMongo = require('./dao/db/managers/ChatManagerMongo')
const http = require('http')
const {Server} = require('socket.io')
const Database = require('./dao/db/db')
const PORT = 8080 || process.env.PORT

const app = express()
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://emiliojrg88:pBMHOMINd1WpdtGd@coder.q3bmoe2.mongodb.net/ecommerce'
    }),
    secret: 'secretEcommerce',
    resave: true,
    saveUninitialized: true
}))


let msjs = []

let prod = new ProductManagerMongo
let chat = new ChatManagerMongo

const productRouters = require('./router/products.route')
const cartRouters = require('./router/carts.route')
const homeRouter = require('./router/home.router')
const realtimeRouter = require('./router/realtime.route')
const chatRouter = require('./router/chat.route')
const productsRouters = require('./router/productsPaginate.route')
const cartListRouters = require('./router/cartList.route')
const viewsRouter = require('./router/views.route')
const authRouter = require('./router/auth.route')
const startRouter = require('./router/start.route')

//SERVER HTTP
const server = http.createServer(app)

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
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views')

app.use(express.json())
app.use(express.urlencoded({extended:false}))


//ROUTES
app.use('/home', homeRouter)
app.use('/api/product', productRouters)
app.use('/api/cart', cartRouters)
app.use('/realtimeproducts', realtimeRouter)
app.use('/chat', chatRouter)
app.use('/products', productsRouters)
app.use('/cart', cartListRouters)
app.use('/view', viewsRouter)
app.use('/auth', authRouter)
app.use('/', startRouter)

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
        let resultado = await prod.getProducts()
        return resultado
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
            await realizarLlamadaPOST(`http://localhost:8080/api/product/`, data);
            let products = await getAllProducts()
            io.sockets.emit('products-update', products);
            } catch (error) {
                console.error('Error en la llamada POST:', error);
            };
        });

    /*INICIO CHAT*/
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
    /*FIN CHAT*/
})
  
server.listen(PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${PORT}`)
    Database.connect()
})
