const CONFIG = require('./config/config');
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const handlebars = require('express-handlebars')
const ProductManagerMongo = require('./controllers/ProductManagerMongo')
const ChatManagerMongo = require('./controllers/ChatManagerMongo')
const initializePassport = require('./passport/passport')
const initializePassportGithub = require('./passport/passport.github')
const passport = require('passport')
const http = require('http')
const {Server} = require('socket.io')
const Database = require('./models/db/db')
const PORT = CONFIG.PORT

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

const routerProduct = require('./routes/products.route')
const routerCart = require('./routes/carts.route')
const routerHome = require('./routes/home.router')
const routerRealtime = require('./routes/realtime.route')
const routerChat = require('./routes/chat.route')
const routerProducts = require('./routes/productsPaginate.route')
const routerCartList = require('./routes/cartList.route')
const routerViews = require('./routes/views.route')
const routerAuth = require('./routes/auth.route')
const routerStart = require('./routes/start.route')
const routerMocking = require('./routes/mocking.route')

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
app.use('/auth', routerAuth)
app.use('/', routerStart)
app.use('/mockingproducts', routerMocking)

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
