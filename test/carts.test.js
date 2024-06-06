import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import CartManagerMongo from '../scr/controllers/CartManagerMongo.js'
import ProductService from '../scr/services/ProductService.js'

const requester = supertest('http://localhost:8080')

mongoose.connect(`mongodb+srv://emiliojrg88:pBMHOMINd1WpdtGd@coder.q3bmoe2.mongodb.net/ecommerce_test`)

describe('Testing de Cart', () => {

    before(async function () {
        this.cart = new CartManagerMongo()
        this.prod = new ProductService()

        /* if (mongoose.connection.collections.carts) {
            await mongoose.connection.collections.carts.drop()
        } */
    })

    describe("Test de carrito de compra:", () => {

        before(function () {
            this.timeout(5000)
            this.mockUser = {
                email: "test01@gmail.com",
                password: "987654"
            }
        })

        // Test 01
        it("Creo un carrito nuevo en la base", async function () {
            // Given:
    
            // Then:
            this.newCart = await this.cart.createCart()
    
            // Assert:
            expect(this.newCart).to.be.an.instanceof(mongoose.Types.ObjectId);
        })

        // Test 02
        it("Agrego un producto al carrito recien creado", async function () {
            //Given:
            let limit = 10
            let page = 1
            let sort = 1
            let filter

            const resp = await this.prod.getProductsPaginate(limit, page, sort, filter)
            const ultimoProducto = resp.docs[resp.docs.length - 1]

            const login = await requester.post('/auth/login').send(this.mockUser)

            const header = login.header['set-cookie'][0]
            const cookieData = header.split('=')
            this.cookie = {
                name: cookieData[0],
                value: cookieData[1]
            }

            //Then:
            const respII = await requester.post(`/api/cart/${this.newCart._id}/product/${ultimoProducto._id}`).set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])
            
            // Assert:
            expect(respII.status).to.equal(200)
            expect(respII.res.text).to.include(`Carrito ${this.newCart._id} con producto ${ultimoProducto._id} actualizado`)
        })
        
        // Test 03
        it("vacio el carrito creado", async function () {
            // given

            // Then
            const resp = await requester.del(`/api/cart/${this.newCart._id}`).send()

            expect(resp.status).to.equal(200)
            expect(resp.res.text).to.include(`Se borraron todos los productos del carrito ${this.newCart._id}`)
        })
    })
    after(async function() {
        // Cierra la conexión a la base de datos
        await mongoose.connection.close();
    });
})
