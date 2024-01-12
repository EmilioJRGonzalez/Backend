const express = require ('express')
const ProductManager = require('./ProductManager')

const app = express()

let prod = new ProductManager('./scr/productos.json')

app.get('/', (req, res) => {
    res.send('<h1>Bienvenido</h1>')
})

app.get('/products', async (req, res) => {
    let aux = await prod.getProducts()
    let limit = req.query.limit
    if (limit){
        aux.splice(parseInt(limit))
    }
    res.send(aux);
})

app.get('/products/:pid', async (req, res) => {
    let pid = req.params.pid
    let aux = await prod.getProductById(pid)
    if (!aux){
        aux = {"Error": `No se encontró un producto con el id ${pid}`}
    }
    res.send(aux);
})

app.listen(8080, ()=> {
    console.log("Servidor corriendo")
})
