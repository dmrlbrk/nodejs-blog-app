import Express from "express"
const router = Express.Router()
import Post from "../models/Post.js"
import path from 'path'
import Category from "../models/Category.js";
import Users from "../models/Users.js";

const __dirname = path.resolve();

router.get('/new', (req, res) => {
    if (!req.session.userId) {
        res.redirect('/users/login')
    }
    Category.find({}).lean().then(categories => {
        res.render('site/add-post', { categories: categories })
    })
})
// router.get('/post/test', (req, res) => { res.send('TEST OK') })

router.get('/category/:categoryId', (req, res) => {
    Post.find({ category: req.params.categoryId }).lean().populate({
        path: "category",
        model: Category
    }).then(posts => {
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
        ]).then((categories) => {
            res.render('site/blog', { categories: categories, posts: posts })
        })
    })
})



router.get('/:id', (req, res) => {
    Post.findById(req.params.id).lean().populate({ path: "author", model: Users }).sort({ $natural: -1 }).then(post => {
        // console.log(req.params)
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
                Post.find({}).lean().populate({ path: "author", model: Users }).sort({ $natural: -1 }).then(posts => {
                    res.render(`site/post`, { post: post, categories: categories, posts: posts })
                })
            })
    })
})


router.post('/test', (req, res) => {

    // console.log(req.files)

    let post_image = req.files.post_image

    post_image.mv(path.resolve(__dirname, './public/img/postimages', post_image.name))

    Post.create({
        ...req.body,
        post_image: `/img/postimages/${post_image.name}`,
        author: req.session.userId
    })


    req.session.sessionFlash = {
        type: "alert alert-success",
        message: 'Postunuz başarılı bir şekilde oluşturuldu'
    }

    res.redirect('/blog')
})

export default router