import Carts from '../models/db/cart.model.js'

export default class CartService {
    constructor(){
    }

    async createEmptyCart(){
        try{
            let resp = await Carts.create({products: []})
            return resp._id
        }catch(err){
            return err.toString()
        }
    }

    async findOneCart(cid){
        try{
            return await Carts.findOne({_id: cid})
        }catch(err){
            return err.toString()
        }
    }

    async updateOneCartWithProducts(cid, body){
        try{
            const update = { $set: { products: body } };
        
            return await Carts.updateOne({_id: cid}, update);
        }catch(err){
            return err.toString()
        }
    }

    async updateOneCart(cid, prodToUpdate){
        try{
            return await Carts.updateOne({_id: cid}, { products: prodToUpdate } )
        }catch(err){
            return err.toString()
        }
    }

    async findOneCartAndPopulate(cid){
        try{
            return await Carts.findOne({_id: cid}).populate('products.product').lean();
        }catch(err){
            return err.toString()
        }
    }

    async updateCartProductQuantity(cid, pid, quantity){
        try{
            const filter = { _id: cid, "products.product": pid }
            const update = { $set: { "products.$.quantity": quantity } }
            return await Carts.updateOne(filter, update)
        }catch(err){
            return err.toString()
        }
    }
  
}
