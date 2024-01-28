const express = require ('express')
//const = require('./ProductManager')
const handlebars = require('express-handlebars')
const ProductManager = require('./ProductManager')
const http = require('http')
const {Server} = require('socket.io')
const app = express()
const PORT = 8080 || process.env.PORT

let prod = new ProductManager('./scr/productos.json')

const productRouters = require('./router/products.route')
const cartRouters = require('./router/carts.route')
const homeRouter = require('./router/home.router')
const realtimeRouter = require('./router/realtime.route')

//SERVER HTTP
const server = http.createServer(app)

//PUBLIC
app.use(express.static(__dirname+"/public"))

//ENGINE
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

app.use(express.json())

//ROUTES
app.use('/home', homeRouter)
app.use('/api/product', productRouters)
app.use('/api/cart', cartRouters)
app.use('/realtimeproducts', realtimeRouter)

function realizarLlamadaPOST(url, datos) {
    return new Promise((resolve, reject) => {
        const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
        };

        console.log('1')
  
        fetch(url, opciones)
            .then(response => {
                if (response.ok) {
                    console.log('2')
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
        // Llama a getProducts() y espera a que se resuelva la Promesa
        let resultado = await prod.getProducts()
        //console.log('Datos obtenidos:', resultado);
        return resultado
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

//SOCKET SERVER
const io = new Server(server)
io.on('connection', (socket)=> {
  console.log('cliente conectado')

  socket.on('product-add', (data)=> {
    console.log("ADD ")

    realizarLlamadaPOST(`http://localhost:8080/api/product/`, data)
    .then(resultado => {
      console.log('Llamada POST exitosa:', resultado);
    })
    .catch(error => {
      console.error('Error en la llamada POST:', error);
    });

    let products = getAllProducts()
    console.log("getAllProducts ", products)

    //arrMessage.push(data)
    //io.sockets.emit('messsage-all', arrMessage)

  })
})
  
 
server.listen(PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})

