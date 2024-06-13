import express from 'express'
import ProductManager from '../models/fileSystem/ProductManager.js'
import ProductManagerMongo from '../controllers/ProductManagerMongo.js'
import { uploader } from '../utils/uploadImage.js'
import { basename } from 'path';

const { Router } = express
const router = new Router()

//let prod = new ProductManager('./scr/models/fileSystem/data/productos.json')
let prod = new ProductManagerMongo

router.get('/', async (req, res)=> {
    let limit = 10
    let page = 1
    let sort = 1
    let filter
    let aux = await prod.getProducts(limit, page, sort, filter)
    res.render('home', {products: aux.payload})
})

router.post("/updloadimage", uploader.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ status: "error", mensaje: "No se adjuntó archivo." });
    }

    let image = req.body
    image.path = req.file.path
    console.log(image)
    if (!image.nombre) {
        console.error("El nombre no es valido.");
        console.error(image);
        res.status(400).send({ status: "Error", message: "Archivo invalido, verifique los datos ingresados." });
    } else {
        res.send({ status: "Success", message: `Archivo guardado correctamente on el nombre ${basename(image.path)}` });
    }
})

export default router