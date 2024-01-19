const fs = require('fs');

class ProductManager {
    constructor(path){
        this.products = [];
        this.id = 0;
        this.path = path;
    }

    async readFile(){
        let res = await fs.promises.readFile(this.path, 'utf-8')
        return res
    }

    writeFile(){
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');    
    }

    getNewId(){
        let aux = 0;
        for (let i = 0 ; i < this.products.length; i++) {
            if (this.products[i].id > aux){
                aux = this.products[i].id;
            }
        }
        return aux+1;
    }

    async getProducts(){
        let res = await fs.promises.readFile(this.path, 'utf-8')
        this.products = JSON.parse(res);
        return this.products;
    }

    async addProduct(id, title, description, price, thumbnail, code, stock, status, category){

        if (!title || !description || !price || !thumbnail || !code || !stock || !category){
            return "ERROR: Debe ingresar todos los parametros"
        }else{

            let res = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(res);

            if (!this.products.some((p) => p.code === code)) {
                //this.id = this.getNewId();
                let newProduc = { id, title, description, price, thumbnail, code, stock, status, category };

                this.products.push(newProduc);
                this.writeFile();
                return `El producto '${title}' fue agregado correctamente`
            } else {
                return `ERROR: No fue posible dar de alta el producto. Ya existe el codigo ${code}`
            }
            

        }
    }

    async getProductById (id){
        let res = await fs.promises.readFile(this.path, 'utf-8')
        this.products = JSON.parse(res);
            
        let product = this.products.find((p) => p.id === parseInt(id));

        if (product) {
            return(product);
        } else {
            console.log (`No se encontró un producto con el id ${id}`);
        }
    }

    async deleteProduct (id){
        let res = await fs.promises.readFile(this.path, 'utf-8')
        this.products = JSON.parse(res);

        let aux = -1
        for (let i = 0 ; i < this.products.length; i++) {
            if (this.products[i].id == id){
                aux = i;
            }
        }

        if (aux >= 0){
            this.products.splice(aux, 1);
            this.writeFile();
            return `El producto con el id ${id} fue eliminado correctamente`
        } else {
            return `Error: No se encontró un producto con el id ${id}`
        }
    }

    async updateProduct (id, title, description, price, thumbnail, code, stock, status, category){

        if (!title || !description || !price || !thumbnail || !code || !stock || !category){
            return "ERROR: Debe ingresar todos los parametros"
        }else{
            let res = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(res);
            let aux = -1
            for (let i = 0 ; i < this.products.length; i++) {
                if (this.products[i].id == id){
                    aux = i;
                }
            }

            if (aux >= 0){
                this.products[aux].title = title;
                this.products[aux].description = description;
                this.products[aux].price = price;
                this.products[aux].thumbnail = thumbnail;
                this.products[aux].code = code;
                this.products[aux].stock = stock;
                this.products[aux].status = status;
                this.products[aux].category = category;
                this.writeFile();
                return `El producto con el codigo ${id} fue actualizado`
            } else {
                return `Error: No se encontró un producto con el codigo ${id}`
            }
        }
    }
}

module.exports = ProductManager


//const product = new ProductManager('productos.json');

//product.getProducts();

//product.addProduct('producto prueba 1','Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);

//product.addProduct('producto prueba 2', 'Este es un producto prueba', 200, 'Sin imagen');

//product.addProduct('producto prueba 3', 'Este es un producto prueba 3', 300, 'Sin imagen', 'def456', 5);

//product.addProduct('producto prueba 4', 'Este es un producto prueba 4', 400, 'Sin imagen', 'aaa111', 8);

//product.addProduct('producto prueba 4', 'Este es un producto prueba 4', 400, 'Sin imagen', 'aaa789', 18);

//product.getProducts();

//product.getProductById(1);

//product.getProductById(10);

//product.deleteProduct(4);

//product.updateProduct('abc123','producto prueba 5')

//product.updateProduct('abc123','producto prueba 5', 'Este es un producto prueba 5', 500, 'Sin imagen', 10)