import Express from "express";
const router = Express.Router()
import Users from "../models/Users.js";

router.get('/register', (req, res) => {
    res.render('site/register')
})


router.post('/register', (req, res) => {
    Users.create(req.body, (error, user) => {
        req.session.sessionFlash = {
            type: "alert alert-success",
            message: 'Kullanıcı başarılı bir şekilde oluşturuldu'
        }
        res.redirect('/users/login')
    })
})

router.get('/login', (req, res) => {
    res.render('site/login')
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    // console.log(req.body)

    Users.findOne({ email }, (error, user) => {
        if (user) {
            if (user.password == password) {
                console.log("userId :", user._id)
                req.session.userId = user._id
                res.redirect('/')
            }
            else {
                res.redirect('/users/login')
            }
        }
        else {
            res.redirect('/users/register')
        }
    })

})


router.get('/logout', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/')
    })
})


export default router