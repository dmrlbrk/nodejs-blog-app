import Express from "express"
import Post from "../models/Post.js"
import Category from "../models/Category.js"
import Users from "../models/Users.js"

const router = Express.Router()

router.get('/', (req, res) => {
    console.log(req.session)
    res.render('site/index')
})
router.get('/about', (req, res) => { res.render('site/about') })
router.get('/admin', (req, res) => { res.render('admin/index') })

router.get('/blog', (req, res) => {
    Post.find({}).lean().populate({path:"author", model: Users}) .sort({ $natural: -1 }).then(posts => {
        Category.find({}).lean().then(categories => {
            res.render('site/blog', { posts: posts, categories: categories })

        })
    })
})

router.get('/contact', (req, res) => { res.render('site/contact') })
router.get('/register', (req, res) => { res.render('site/register') })


export default router