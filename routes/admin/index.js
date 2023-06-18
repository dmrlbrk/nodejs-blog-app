import Express from "express"
const router = Express.Router()
import path from 'path'
import Category from '../../models/Category.js'
import Post from "../../models/Post.js";
import Users from "../../models/Users.js";

const __dirname = path.resolve();

router.get('/admin', (req, res) => {

    res.redirect('admin/admin')

})

router.get('/categories', (req, res) => {
    Category.find({}).lean().sort({ $natural: -1 }).then(categories => {
        res.render('admin/categories', { categories: categories }
        )
    })
})

router.post('/categories', (req, res) => {
    Category.create(req.body, (error, category) => {
        if (!error) {
            res.redirect('/admin/categories')
        }
    })
})

router.delete('/categories/:id', (req, res) => {
    Category.deleteOne({ _id: req.params.id }).then(() => {
        res.redirect('/admin/categories')
    })
})


router.get('/posts', (req, res) => {
    Post.find({}).lean()
        .populate([{
            path: 'author',
            model: Users
        }, {
            path: 'category',
            model: 'Category'
        }])
        .sort({ $natural: -1 }).then(posts => {

            res.render('admin/posts', { posts: posts }
            )
        })
})


router.delete('/posts/:id', (req, res) => {
    Post.deleteOne({ _id: req.params.id }).then(() => {
        res.redirect('/admin/posts')
    })
})


router.get('/posts/edit/:id', (req, res) => {

    Post.findOne({ _id: req.params.id }).lean().then(post => {
        console.log(post)
        Category.find({}).lean().then(categories => {
            res.render('admin/edit-post', { categories: categories, post: post })
        })
    })
})

router.put('/posts/:id', (req, res) => {

    let post_image = req.files.post_image

    post_image.mv(path.resolve(__dirname, './public/img/postimages', post_image.name))

    Post.findOne({ _id: req.params.id }).then(post => {
        post.title = req.body.title
        post.content = req.body.content
        post.category = req.body.category
        post.date = req.body.date
        // author = req.session.userId
        post.post_image = `/img/postimages/${post_image.name}`

        post.save().then(() => {
            res.redirect('/admin/posts')
        })
    })

})

export default router