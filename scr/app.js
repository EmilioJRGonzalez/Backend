const express = require ('express')
//const = require('./ProductManager')
const app = express()
const PORT = 8080
const productRouters = require('./router/products.route.js')
const cartRouters = require('./router/carts.route')


let products = []

app.use(express.json())

app.use('/api/product', productRouters)
app.use('/api/cart', cartRouters)


app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})
