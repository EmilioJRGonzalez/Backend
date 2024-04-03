const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userModel = require('../models/db/user.model')
const {createHash, isValidPassword} = require('../utils/bcrypt')
const CartManagerMongo = require('../controllers/CartManagerMongo')

let cart = new CartManagerMongo

const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        {usernameField: 'email', passReqToCallback: true},
        async (req, username, password, done) => {
            try{
                let userData = req.body
                let user = await userModel.findOne({email: username})
                if(user){
                    done('Error: el usuario ya existe')
                }
                let cartId = await cart.createCart()
                let userNew = {
                    email: username,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    age: userData.age,
                    password: createHash(userData.password),
                    cart: cartId
                }
                let result = await userModel.create(userNew)
                done(null, result)
            }catch(err){
                done('Error al crear el usuario ' + err)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser((id, done) => {
        let user = userModel.findById(id)
        done(null, user)
    })

}

module.exports = initializePassport
