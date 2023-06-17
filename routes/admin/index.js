import Express from "express"
const router = Express.Router()
import path from 'path'
import Category from '../../models/Category.js'

const __dirname = path.resolve();

router.get('/admin', (req, res) => {

    res.redirect('admin/admin')

})

router.get('/categories', (req, res) => {
    Category.find({}).lean().sort({$natural:-1}).then(categories => {
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
    Category.deleteOne({_id:req.params.id}).then(() => {
        res.redirect('/admin/categories')
    })
})



export default router