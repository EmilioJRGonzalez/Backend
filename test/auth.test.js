require('@babel/register')({
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-transform-modules-commonjs'],
  });
  
  const mongoose = require('mongoose');
  const UserManagerMongo = require('../scr/controllers/UserManagerMongo');

  //mongoose.connect(`mongodb+srv://emiliojrg88:pBMHOMINd1WpdtGd@coder.q3bmoe2.mongodb.net/ecommerce`)
  
  (async () => {
  const chai = await import('chai');
  const supertest = await import('supertest');
  const expect = chai.expect;
  const request = supertest.default;

  mongoose.connect('mongodb+srv://e/ecommerce');

  const requester = request('http://localhost:8080');

  // Define your tests
  describe("Testing Registro y Login:", function() {
    before(function () {
      this.mockUser = {
        first_name: "Nombre Test",
        last_name: "Apellido Test",
        email: "correo_Test@gmail.com",
        password: "123456"
      };
    });

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
  });

  // Run the tests manually to ensure Mocha picks them up
  run();
})();