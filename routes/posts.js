import Express from "express"
const router = Express.Router()
import Post from "../models/Post.js"
import path from 'path'

const __dirname = path.resolve();

router.get('/new', (req, res) => { res.render('site/add-post') })
// router.get('/post/test', (req, res) => { res.send('TEST OK') })

router.get('/:id', (req, res) => {
    Post.findById(req.params.id).lean().then(post => {
        // console.log(req.params)
        res.render(`site/post`, { post: post })
    })
})


router.post('/test', (req, res) => {

    let post_image = req.files.post_image

    post_image.mv(path.resolve(__dirname, './public/img/postimages', post_image.name))

    Post.create({
        ...req.body, 
        post_image: `/img/postimages/${post_image.name}`
    })
    console.log(req.files.post_image)
    // res.redirect('/')
})

export default router