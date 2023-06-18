import Express from "express"
import Post from "../models/Post.js"
import Category from "../models/Category.js"
import Users from "../models/Users.js"

const router = Express.Router()

router.get('/', (req, res) => {
    // console.log(req.session)
    res.render('site/index')
})
router.get('/about', (req, res) => { res.render('site/about') })
router.get('/admin', (req, res) => { res.render('admin/index') })

router.get('/blog', (req, res) => {

    const postPerPage = 1
    const page = req.query.page || 1
    // console.log(req)
    Post
        .find({})
        .lean()
        .populate({ path: "author", model: Users })
        .sort({ $natural: -1 })
        .skip((postPerPage * page) - postPerPage)
        .limit(postPerPage)
        .then(posts => {

            Post.countDocuments().then(postCount => [

                Category.aggregate([
                    {
                        $lookup: {
                            from: 'posts',
                            localField: '_id',
                            foreignField: 'category',
                            as: 'posts'
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            num_of_posts: { $size: '$posts' }
                        }
                    }
                ])
                    .then(categories => {
                        res.render('site/blog', {
                            posts: posts,
                            categories: categories,
                            current: parseInt(page),
                            pages: Math.ceil(postCount / postPerPage)
                        })
                    })
            ])
        })
})

router.get('/contact', (req, res) => { res.render('site/contact') })
router.get('/register', (req, res) => { res.render('site/register') })


export default router