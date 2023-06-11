import Express from "express";
const router = Express.Router()
import Users from "../models/Users.js";

router.get('/register', (req, res) => {
    res.render('site/register')
})


router.post('/register', (req, res) => {
    Users.create(req.body, (error, user) => {
        res.redirect('/')
    })
    // res.render('site/register')
})

router.get('/login', (req, res) => {
    res.render('site/login')
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    console.log(req.body)

    Users.findOne({ email }, (error, user) => {
        if(user) {
            if (user.password === password) {
                res.redirect('/')
            }
            else {
                res.redirect('/users/login')
            }
        }
        else{
            res.redirect('/users/register')
        }
    })

})


export default router