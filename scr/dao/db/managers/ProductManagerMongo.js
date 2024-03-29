const Products = require('../models/product.model')

class ProductManager {
    constructor(){
    }

    async getProducts(limit, page, sort, filter){
        let resp
        let response
        let URL = 'http://localhost:8080/api/product'
        try{
            resp = await Products.paginate(filter, {limit, page, sort: {'price': sort}})
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
            console.log(err)
            response = {
                status: `error: ${err}`,
                payload: []
            }
        }
        return response
    }

    async addProduct(body){
        let resp
        try{
            resp = await Products.create(body)
            return `El producto '${body.title}' fue agregado correctamente`
        }catch(err){
            console.log (err)
            return `ERROR: No fue posible dar de alta el producto ${body.code}. ${err.toString()}`
        }
    }

    async getProductById (id){
        try{
            let resp = await Products.findOne({_id: id})
                return resp
        }catch(err){
            console.log(err)
            return err
        }
    }

    async deleteProduct (id){
        try{
            let resp = await Products.deleteOne({_id: id})
            if (resp.deletedCount === 1){
                return `El producto con el id ${id} fue eliminado correctamente`
            } else {
                return `Error: No se encontró un producto con el id ${id}`
            }
        }catch(err){
            console.log(err)
            return err
        }
    }

    async updateProduct (id, body){
        try{
            const update = {
                ...(body.title !== undefined && {title: body.title}),
                ...(body.description !== undefined && { description: body.description }),
                ...(body.price !== undefined && { price: body.price }),
                ...(body.thumbnail !== undefined && { thumbnail: body.thumbnail }),
                ...(body.code !== undefined && { code: body.code }),
                ...(body.stock !== undefined && { stock: body.stock }),
                ...(body.category !== undefined && { category: body.category })
            };
    
            const resp = await Products.updateOne({_id: id}, update);
    
            return resp.matchedCount === 1 ? `El producto con el codigo ${id} fue actualizado` : `Error: No fue actualizado el producto con el codigo ${id}`
        }catch(err){
            console.log(err)
            return err
        }

    }
}

module.exports = ProductManager