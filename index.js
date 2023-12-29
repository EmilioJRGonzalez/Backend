const fs = require('fs');

class ProductManager {
    constructor(path){
        this.products = [];
        this.id = 0;
        this.path = path;

        this.readFile();
    }

    readFile(){
        let aux = fs.readFileSync(this.path, 'utf-8')

        this.products = JSON.parse(aux);
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

    getProducts(){
        this.readFile();
        console.log(this.products);
    }

    addProduct(title, description, price, thumbnail, code, stock){
        this.readFile();
        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log("ERROR: Debe ingresar todos los parametros");
        }else{
            if (!this.products.some((p) => p.code === code)) {
                this.id = this.getNewId();
                let newProduc = { id: this.id, title, description, price, thumbnail, code, stock };

                this.products.push(newProduc);
                this.writeFile();
                console.log(`El producto '${title}' fue agregado correctamente`);
            } else {
                console.log(`ERROR: No fue posible dar de alta el producto. Ya existe el codigo ${code}`);
            }
        }
    }

    getProductById (code){
        this.readFile();
        let product = this.products.find((p) => p.code === code);

        if (product) {
            console.log(product);
        } else {
            console.log (`No se encontró un producto con el codigo ${code}`);
        }
    }

    deleteProduct (id){
        this.readFile();
        let aux = -1
        for (let i = 0 ; i < this.products.length; i++) {
            if (this.products[i].code == id){
                aux = i;
            }
        }

        if (aux >= 0){
            this.products.splice(aux, 1);
            this.writeFile();
            console.log (`El producto con el codigo ${id} fue eliminado correctamente`);
        } else {
            console.log (`Error: No se encontró un producto con el codigo ${id}`);
        }
    }

    updateProduct (id, title, description, price, thumbnail, stock){
        this.readFile();
        if (!title || !description || !price || !thumbnail || !stock){
            console.log("ERROR: Debe ingresar todos los parametros");
        }else{
            let aux = -1
            for (let i = 0 ; i < this.products.length; i++) {
                if (this.products[i].code == id){
                    aux = i;
                }
            }

            if (aux >= 0){
                this.products[aux].title = title;
                this.products[aux].description = description;
                this.products[aux].price = price;
                this.products[aux].thumbnail = thumbnail;
                this.products[aux].stock = stock;
                this.writeFile();
                console.log (`El producto con el codigo ${id} fue actualizado`);
            } else {
                console.log (`Error: No se encontró un producto con el codigo ${id}`);
            }
        }
    }
}


const product = new ProductManager('productos.json');

product.getProducts();

//product.addProduct('producto prueba 1','Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);

//product.addProduct('producto prueba 2', 'Este es un producto prueba', 200, 'Sin imagen');

//product.addProduct('producto prueba 3', 'Este es un producto prueba 3', 300, 'Sin imagen', 'def456', 5);

//product.addProduct('producto prueba 4', 'Este es un producto prueba 4', 400, 'Sin imagen', 'aaa111', 8);

//product.getProducts();

//product.getProductById('aaa456');

//product.getProductById('def456');

//product.deleteProduct('abc123');

//product.updateProduct('abc123','producto prueba 5')

//product.updateProduct('abc123','producto prueba 5', 'Este es un producto prueba 5', 500, 'Sin imagen', 10)