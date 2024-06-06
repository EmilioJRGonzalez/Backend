import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { getProduct } from '../scr/utils/mock.js'
import ProductService from '../scr/services/ProductService.js'

const requester = supertest('http://localhost:8080')

mongoose.connect(`mongodb+srv://emiliojrg88:pBMHOMINd1WpdtGd@coder.q3bmoe2.mongodb.net/ecommerce_test`)

describe('Testing de productos', () => {

    before(async function () {
        /* if (mongoose.connection.collections.products) {
            await mongoose.connection.collections.products.drop()
        } */
        this.product = getProduct()
        this.prod = new ProductService
        this.body = {
            user: "correo_test@gmail.com"
        }
    })

    describe("Test de productos:", () => {

        before(function () {
            this.timeout(5000);
            //this.user = new UserManagerMongo()
        })

        // Test 01
        it("Envia el producto generado con faker y lo inserta en la base", async function () {
            // Given:
    
            // Then:
            const resp = await requester.post('/api/product').send(this.product)
    
            //Assert:
            expect(resp.status).to.equal(200)
            expect(resp.error.text).to.not.exist
            expect(resp.res.text).to.include(`El producto '${this.product.title}' fue agregado correctamente`)
        })

        // Test 02
        it("Busca un producto en la base", async function () {
            //Given:
            let limit = 10
            let page = 1
            let sort = 1
            let filter

            //Then:
            const resp = await this.prod.getProductsPaginate(limit, page, sort, filter)

            this.ultimoProducto = resp.docs[resp.docs.length - 1]

            // Assert:
            expect(resp.docs).to.exist
            expect(this.ultimoProducto).to.exist
            expect(resp.totalDocs).to.be.at.least(1)
        })

        
        // Test 03
        it("Elimina un producto de la base (El usuario tiene que tener permisos)", async function () {
            // given

            // Then
            const resp = await requester.del(`/api/product/${this.ultimoProducto._id.toHexString()}`).send(this.body)

            expect(resp.error.text).to.not.exist
            expect(resp.status).to.equal(200)
            expect(resp.res.text).to.include(`El producto con el id ${this.ultimoProducto._id.toHexString()} fue eliminado correctamente`)
        })
    })

    after(async function() {
        // Cierra la conexión a la base de datos
        await mongoose.connection.close();
    });
})
