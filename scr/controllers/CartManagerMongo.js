const CartService = require('../services/CartService')
let cart = new CartService

class CartManager {
    constructor(logger) {
        this.logger = logger
    }

    async createCart(){
        try{
            let resp = await cart.createEmptyCart()
            console.log(resp)
            //this.logger.debug(`${JSON.stringify(resp)}`)
            return resp._id
    
        }catch(err){
            //this.logger.warning(err.toString())
            console.log(err.toString())
            return err.toString()
        }
    }

    async addProductToCart(cid, pid){
        let aux = ''
        let respC = ''

        try{
            respC = await cart.findOneCart(cid)
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
    
                const resp = await cart.updateOneCart(cid, prodToUpdate)
                aux = `Carrito ${cid} con producto ${pid} actualizado`
            }
            return aux

        }catch(err){
            this.logger.warning(err.toString())
            return err.toString()
        }
    }

    async getCartByIdTest (cid){
        try{
            let resp = await cart.findOneCart(cid)
            return resp == null ? `No se encontró un producto con el id ${cid}` : resp
        }catch(err){
            return err.toString()
        }
    }

    async getCartById (cid){
        try{
            let resp = await cart.findOneCartAndPopulate(cid)
            return resp == null ? `No se encontró un carrito con el id ${cid}` : resp.products
        }catch(err){
            this.logger.warning(err.toString())
            return err.toString()
        }
    }

    async deleteProductFromCart(cid, pid){
        let resp
        let respC
        let aux

        try{
            respC = await cart.findOneCart(cid)
            if (respC == null) {
                aux = `ERROR: No existe el carrito ${cid}`
            }else{
                const index = respC.products.findIndex(item => item.product == pid);
                respC.products = respC.products.filter(item => item.product.toString() !== pid);

                let prodToUpdate
                if (index === -1) {
                    aux = `pid ${pid} NO encontrado`
                }else{
                    prodToUpdate = [...respC.products]
                    const resp = await cart.updateOneCart(cid, prodToUpdate)
                    aux = `Carrito ${cid} con producto ${pid} actualizado`
                }
            }
        }catch(err){
            this.logger.warning(err.toString())
            aux = err.toString()
        }

        return aux
    }

    async updateCartProducts(cid, body){
        let aux
        try {        
            const result = await cart.updateOneCartWithProducts(cid, body)
            this.logger.debug(`${JSON.stringify(result)}`)
        
            if (result.modifiedCount > 0) {
                aux = `Se actualizaron los productos del carrito ${cid}`
            } else {
                aux = `No se actualizó el carrito ${cid}`
            }
        } catch (error) {
            aux = error
        }
        
        return aux
    }

    async updateQuantity(cid, pid, quantity){
        let aux
        try {        
            const result = await cart.updateCartProductQuantity(cid, pid, quantity)
        
            if (result.modifiedCount > 0) {
                aux = `La cantidad del producto ${pid} se actualizó correctamente.`
            } else {
                aux = `No se actualizó la cantidad del producto ${pid}`
            }
        } catch (error) {
            aux = error
        }

        return aux
    }

    async clearCart(cid){
        let aux
        try {
            const result = await cart.updateOneCart(cid, [])

            this.logger.debug(`${JSON.stringify(result)}, ${cid}`)
        
            if (result.modifiedCount > 0) {
                aux = `Se borraron todos los productos del carrito ${cid}`
            } else {
                aux = `No se actualizó el carrito ${cid}`
            }
        } catch (error) {
            aux = error
        }
        
        return aux
    }
  
}

module.exports = CartManager

