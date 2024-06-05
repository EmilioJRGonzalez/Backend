import express from 'express'
import authII from '../middleware/auth.js'

const router = express.Router()

router.get('/', authII, (req, res)=>{
    console.log("inside chat")
    res.render('chat', {})
})

export default router