import CONFIG from '../config/config.js'
import passport from 'passport'
import github from 'passport-github2'
import userModel from '../models/db/user.model.js'
import { createHash, isValidPassword } from '../utils/bcrypt.js'
import CartManagerMongo from '../controllers/CartManagerMongo.js'

const PORT = CONFIG.PORT
const cart = new CartManagerMongo()

const initPassport=()=>{
    passport.use("github", new github.Strategy(
        {
            clientID:"Iv1.92464d2b60fc2196",
            clientSecret:"b0605d48a1262f69db180c43ecc72d56e2bc0da2",
            callbackURL:`${CONFIG.PROTOCOL}://${CONFIG.HOST}/api/users/callbackGithub`
        },
        async(accessToken, refreshToken, profile, done) => {
            try{
                /* console.log(profile) */
                let {email, login} = profile._json
                email = email || login
                let usuario = await userModel.findOne({email})
                if(!usuario){
                    let cartId = await cart.createCart()
                    usuario = await userModel.create(
                        {
                            first_name: login, 
                            last_name: "last_name", 
                            email, 
                            age: 0, 
                            password: createHash(""),
                            cart: cartId
                        }
                    )
                }
                await userModel.findByIdAndUpdate( usuario._id, { last_connection: new Date() })
                return done(null, usuario)
            }catch(err){
                return done (err)
            }
        }
    ))   

}

passport.serializeUser((usuario, done) => {
    done(null, usuario)
});

passport.deserializeUser((usuario, done) => {
    done(null, usuario)
});

export default initPassport