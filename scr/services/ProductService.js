const Products = require('../models/db/product.model')

class ProductService {
    constructor(){
    }

    async getProductsPaginate(limit, page, sort, filter){
        try{
            return await Products.paginate(filter, {limit, page, sort: {'price': sort}})
        }catch(err){
            throw new Error(err.message);
        }
    }

    async createProduct(body){
        try{
            return await Products.create(body)
        }catch(err){
            throw new Error(err.message);
        }
    }

    async findOneProduct(id){
        try{
            return await Products.findOne({_id: id})
        }catch(err){
            throw new Error(err.message);
        }
    }

    async deleteOneProduct(id){
        try{
            return await Products.deleteOne({_id: id})
        }catch(err){
            throw new Error(err.message);
        }
    }

    async updateOneProduct(id, update){
        try{    
            return await Products.updateOne({_id: id}, update);
        }catch(err){
            throw new Error(err.message);
        }

    }
}

module.exports = ProductService