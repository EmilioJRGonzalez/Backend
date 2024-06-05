import chai from 'chai'
import supertest from 'supertest'
import mongoose from 'mongoose'


const expect = chai.expect
const requester = supertest('http://localhost:8080')

mongoose.connect(`mongodb+srv://emiliojrg88:pBMHOMINd1WpdtGd@coder.q3bmoe2.mongodb.net/ecommerce`)

  describe('Testing Pets App', () => {

    /*=============================================
    =                   Section 02                =
    =============================================*/
    describe("Testing login and session with Cookies:", () => {


        before(function () {
            this.mockUser = {
                first_name: "Nombre Test",
                last_name: "Apellido Test",
                email: "correo_Test@gmail.com",
                password: "123456"
              };
        });



        // Test 01
        // Test 01
        it("Registro Usuario: Debe poder registrar correctamente un usuario", async function () {
            // Given:
            console.log(this.mockUser);
    
            // Then:
            const aux = await requester.post('/auth/register').send(this.mockUser);
            console.log(aux);
    
            // Assert that:
            expect(aux.status).to.equal(200); // Revisa que la propiedad `status` sea 200
        });



        // Test 02
        it("Test Login Usuario: Debe poder hacer login correctamente con el usuario registrado previamente.", async function () {
            //Given:
            const mockLogin = {
                email: this.mockUser.email,
                password: this.mockUser.password,
            }

            //Then: 
            const result = await requester.post('/api/sessions/login').send(mockLogin)
            // console.log(result);

            const cookieResult = result.header['set-cookie'][0]
            const cookieData = cookieResult.split('=')
            this.cookie = {
                name: cookieData[0],
                value: cookieData[1]
            }

            //Assert that:
            expect(this.cookie.name).is.ok.and.eql('coderCookie')
            expect(this.cookie.value).is.ok

        });

        // Test 03
        it("Test Ruta Protegida: Debe enviar la cookie que contiene el usuario y destructurarla correctamente.", async function () {

            // given


            // Then
            const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])
            // console.log(_body);


            // Assert
            expect(_body.payload.email).to.be.ok.and.eql(this.mockUser.email);

        })


    });

})