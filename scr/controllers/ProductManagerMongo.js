import CONFIG from '../config/config.js'
const PORT = CONFIG.PORT

import CustomError from '../middleware/Err/CustomError.js'
import EErrors from '../middleware/Err/ErrorsEnum.js'
import { insertProductErrorInfo } from '../services/errors/produc-creation-error.message.js'

import ProductService from '../services/ProductService.js'
import UserService from '../services/UserService.js'

let product = new ProductService
let user = new UserService

export default class ProductManager {
    constructor(logger) {
        this.logger = logger
    }

    async getProducts(limit, page, sort, filter){
        let resp
        let response
        let URL = `http://localhost:${PORT}/api/product`
        try{
            resp = await product.getProductsPaginate(limit, page, sort, filter)
            let payload = resp.docs.map(item => item._doc)

            response = {
                status: 'success',
                payload,
                totalPages: resp.totalPages,
                prevPage: resp.prevPage,
                nextPage: resp.nextPage,
                page: resp.page,
                hasPrevPage: resp.hasPrevPage,
                hasNextPage: resp.hasNextPage,
                prevLink: resp.hasPrevPage ? URL + `?page=${resp.prevPage}`: null,
                nextLink: resp.hasNextPage ? URL + `?page=${resp.nextPage}`: null,
            }
        }catch(err){
            this.logger.warning(err.toString())
            response = {
                status: `error: ${err}`,
                payload: []
            }
        }
        return response
    }

    async addProduct(body){
        let resp
        console.log(body)

        try{
            if (!body.title || !body.description || !body.price || !body.thumbnail || !body.code || !['Categoria 1', 'Categoria 2', 'Categoria 3'].includes(body.category)) {
                CustomError.createError({
                    name: "Product creation Error",
                    cause: insertProductErrorInfo(body),
                    message: "Error al tratar de alta un producto",
                    code: EErrors.INVALID_TYPES_ERROR
                })
        }
        //try{
            resp = await product.createProduct(body)
            this.logger.debug(`${JSON.stringify(resp)}`)
            return `El producto '${body.title}' fue agregado correctamente`
        }catch(err){
            this.logger.warning(err.toString())
            return `ERROR: No fue posible dar de alta el producto ${body.code}. ${err.toString()}`
        }
    }

    async getProductById (id){
        try{
            let resp = await product.findOneProduct(id)
            //this.logger.debug(`${JSON.stringify(resp)}`)
            console.log(JSON.stringify(resp))
            return resp
        }catch(err){
            console.log(err)
            //this.logger.debug(err.toString())
            return err
        }
    }

    async deleteProduct (id, email){
        let runUpdate = {data: false, msg: ''}
        try{
            runUpdate = await this.update(id, email)

            if (runUpdate.data){
                let resp = await product.deleteOneProduct(id)
                if (resp.deletedCount === 1){
                    return `El producto con el id ${id} fue eliminado correctamente`
                } else {
                    return `Error: No se encontró un producto con el id ${id}`
                }
            }else{
                return `Error: No se eliminó el producto con el id ${id}. ${runUpdate.msg}`
            }
        }catch(err){
            this.logger.warning(err.toString())
            return err
        }
    }

    async updateProduct (id, body){
        let runUpdate = {data: false, msg: ''}
        let resp
        try{
            if (body.email){
                let userFound = await user.findOneUser(body.email)

                if (!userFound){
                    return `Error: No se encontró el usuario ${body.email}`
                }
                runUpdate = await this.update(id, body.email)
            }else if (Object.keys(body).length === 1 && 'stock' in body){
                //Si no mandan el usuario solo permito actualizar el stock porque es una compra
                runUpdate.data = true
            }           

            if (runUpdate.data){
                const update = {
                    ...(body.title !== undefined && {title: body.title}),
                    ...(body.description !== undefined && { description: body.description }),
                    ...(body.price !== undefined && { price: body.price }),
                    ...(body.thumbnail !== undefined && { thumbnail: body.thumbnail }),
                    ...(body.code !== undefined && { code: body.code }),
                    ...(body.stock !== undefined && { stock: body.stock }),
                    ...(body.category !== undefined && { category: body.category })
                };
        
                resp = await product.updateOneProduct(id, update)
            }else{
                return `Error: No se actualizó el producto con el id ${id}`
            }
 
            return resp.matchedCount === 1 ? `El producto con el codigo ${id} fue actualizado` : `Error: No fue actualizado el producto con el codigo ${id}`
        }catch(err){
            //this.logger.warning(err.toString())
            console.log(err.toString())
            return err
        }

    }

    async update (id, email){
        let runUpdate = {data: false, msg: 'Ud. no tiene permisos'}

        let userFound = await user.findOneUser(email)
        let prod = await product.findOneProduct(id)

        if (!userFound){
            runUpdate.msg = `Error: No se encontró el usuario ${email}`
            return runUpdate
        }
        if (!prod){
            runUpdate.msg = `Error: No se encontró el producto ${id}`
            return runUpdate
        }

        if (userFound.role == 'admin'){
            runUpdate = {data: true, msg: ''}
        }
        else if (userFound.role == 'premium' && prod.owner == email){
            runUpdate = {data: true, msg: ''}
        }

        console.log("runUpdate1", runUpdate)
        return runUpdate
    }

}