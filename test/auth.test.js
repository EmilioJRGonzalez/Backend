import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import UserManagerMongo from '../scr/controllers/UserManagerMongo.js'

const requester = supertest('http://localhost:8080')

mongoose.connect(`mongodb+srv://emiliojrg88:pBMHOMINd1WpdtGd@coder.q3bmoe2.mongodb.net/ecommerce_test`)

describe('Testing de auth', () => {

    before(async function () {
        if (mongoose.connection.collections.users) {
            await mongoose.connection.collections.users.drop()
        }
        if (mongoose.connection.collections.carts) {
            await mongoose.connection.collections.carts.drop()
        }
        if (mongoose.connection.collections.sessions) {
            await mongoose.connection.collections.sessions.drop()
        }
    })

    describe("Test de login y session:", () => {

        before(function () {
            this.timeout(5000);
            this.mockUser = {
                first_name: "Nombre Test",
                last_name: "Apellido Test",
                email: "correo_test@gmail.com",
                password: "123456"
            }
            this.user = new UserManagerMongo()
        })

        // Test 01
        it("Registro de usuario mock", async function () {
            // Given:
    
            // Then:
            const resp = await requester.post('/auth/register').send(this.mockUser);
    
            // Assert:
            expect(resp.status).to.equal(302)
            expect(resp.headers.location).to.equal('/view/login-view')
        })

        // Test 02
        it("Login con el usuario registrado previamente.", async function () {
            //Given:

            //Then: 
            const resp = await requester.post('/auth/login').send(this.mockUser)

            const header = resp.header['set-cookie'][0]
            const cookieData = header.split('=')
            this.cookie = {
                name: cookieData[0],
                value: cookieData[1]
            }

            // Assert:
            expect(resp.status).to.equal(302)
            expect(resp.headers.location).to.equal('/products')
        })

        
        // Test 03
        it("Acceso a ruta Protegida seteando la cookie con los datos recibidos en el login", async function () {
            // given

            // Then
            const resp = await requester.get('/view/profile-view').set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])

            expect(resp.status).to.equal(200)
            expect(resp.res.text).to.match(new RegExp(this.mockUser.email));
        })
    })
    after(async function() {
        // Cierra la conexión a la base de datos
        await mongoose.connection.close();
    });
})
