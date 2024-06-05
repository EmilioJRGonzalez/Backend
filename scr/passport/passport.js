import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import userModel from '../models/db/user.model.js'
import { createHash, isValidPassword } from '../utils/bcrypt.js'
import CartManagerMongo from '../controllers/CartManagerMongo.js'

const cart = new CartManagerMongo()

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

export default initializePassport

