import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.redirect('/view/login-view')
})

export default router