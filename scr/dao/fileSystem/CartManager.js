const fs = require('fs');

class CartManager {
    constructor(path){
        this.carts = [];
        this.path = path;
    }

    async readFile(){
        let res = await fs.promises.readFile(this.path, 'utf-8')
        return res
    }

    writeFile(){
        fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2), 'utf-8');    
    }

    async createCart(id){
        let res = await fs.promises.readFile(this.path, 'utf-8')
        this.carts = JSON.parse(res);

        let newCart = { id, products:[] };
        console.log(newCart)
        this.carts.push(newCart)
        this.writeFile()
        return `Se creó el carrito con id ${id}`
    }

    async addProductToCart(cid, pid){

        if (!cid || !pid){
            return "ERROR: Debe ingresar todos los parametros"
        }else{

            let res = await fs.promises.readFile(this.path, 'utf-8')
            this.carts = JSON.parse(res);

            let cart = this.carts.find((p) => p.id == (cid));

            if (cart) {
                let products = cart.products
                const exist = products.find(p => p.product == pid);

                if (exist) {
                    exist.quantity += 1;
                }else{
                    let newProduc = { product: pid, quantity: 1};
                    cart.products.push(newProduc);
                }

                this.writeFile();

                return `Carrito ${cid} con produtco ${pid} actualizado`
            } else {
                return `ERROR: No existe el carrito ${cid}`
            }
            

        }
    }

    async getCartById (id){
        let res = await fs.promises.readFile(this.path, 'utf-8')
        this.carts = JSON.parse(res);
            
        let cart = this.carts.find((p) => p.id == id);

        if (cart) {
            return(cart);
        } else {
            return `No se encontró un producto con el id ${id}`;
        }
    }

  
}

module.exports = CartManager

