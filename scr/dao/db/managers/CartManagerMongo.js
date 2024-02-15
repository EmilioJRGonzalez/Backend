const Carts = require('../models/cart.model')

class CartManager {
    constructor(){
    }

    async createCart(){
        try{
            let resp = await Carts.create({products: []})
            console.log(resp)
            return `Se creó el carrito con id ${resp._id}`
    
        }catch(err){
            return err.toString()
        }
    }

    async addProductToCart(cid, pid){
        let aux = ''
        let respC = ''

        try{
            respC = await Carts.findOne({_id: cid})
            if (respC == null) {
                aux = `ERROR: No existe el carrito ${cid}`
            }else{
                const index = respC.products.findIndex(item => item.product == pid);
                let prodToUpdate
                if (index === -1) {
                    prodToUpdate = [ ...respC.products, 
                                    {product: pid, quantity: 1}
                                ]
                }else{
                    respC.products[index].quantity += 1;
                    prodToUpdate = respC.products
                }
    
                const resp = await Carts.updateOne({_id: cid}, {products: prodToUpdate})
                aux = `Carrito ${cid} con producto ${pid} actualizado`
            }
            return aux

        }catch(err){
            return err.toString()
        }
    }

    async getCartById (cid){
        try{
            let resp = await Carts.findOne({_id: cid})
            return resp == null ? `No se encontró un producto con el id ${cid}` : resp
        }catch(err){
            return err.toString()
        }
    }

  
}

module.exports = CartManager

