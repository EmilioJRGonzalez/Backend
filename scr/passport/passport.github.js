const passport = require('passport')
const github = require('passport-github2')
const userModel = require('../dao/db/models/user.model')
const {createHash, isValidPassword} = require('../utils/bcrypt')
const CartManagerMongo = require('../dao/db/managers/CartManagerMongo')

let cart = new CartManagerMongo

const initPassport=()=>{

    passport.use("github", new github.Strategy(
        {
            clientID:"Iv1.92464d2b60fc2196",
            clientSecret:"b0605d48a1262f69db180c43ecc72d56e2bc0da2",
            callbackURL:"http://localhost:8080/auth/callbackGithub"
        },
        async(accessToken, refreshToken, profile, done) => {
            try{
                console.log(profile)
                let {email, login} = profile._json
                email = email || login
                let usuario = await userModel.findOne({email})
                if(!usuario){
                    let cartId = await cart.createCart()
                    usuario = await userModel.create(
                        {
                            first_name: login, 
                            last_name: "", 
                            email, 
                            age: 0, 
                            password: createHash(""),
                            cart: cartId
                        }
                    )
                }
                return done(null, usuario)
            }catch(err){
                return done (error)
            }
        }
    ))   

}

passport.serializeUser((usuario, done) => {
    done(null, usuario)
})
passport.deserializeUser((usuario, done) => {
    done(null, usuario)
})

module.exports = initPassport