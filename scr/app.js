const express = require ('express')
//const = require('./ProductManager')
const handlebars = require('express-handlebars')
const http = require('http')
const {Server} = require('socket.io')
const app = express()
const PORT = 8080 || process.env.PORT

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

//ROUTES
app.use('/home', homeRouter)
app.use('/api/product', productRouters)
app.use('/api/cart', cartRouters)
app.use('/realtimeproducts', realtimeRouter)

let products = []
let arrMessage = []

app.use(express.json())


//SOCKET SERVER
const io = new Server(server)
io.on('connection', (socket)=> {
  console.log('Hola Nuevo Cliente')
  socket.emit('wellcome', 'Bienvenido Clinete nuevo')

  socket.on('new-message', (data)=> {
    arrMessage.push(data)
    io.sockets.emit('messsage-all', arrMessage)
  })
})

server.listen(PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})

