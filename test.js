import mongoose from 'mongoose'

import Post from './models/Post.js'


mongoose.connect('mongodb://127.0.0.1:27017/nodeblog_test_db', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => console.log('Connected!'));



Post.findByIdAndUpdate("6484b0acca0d007505c6a1bc", {title:"NEW My Third Title"}, (error, post) => console.log(error, post)
)



// Post.findByIdAndDelete({
// Post.findByIdAndDelete({
// Post.findByIdAndUpdate({
// Post.findById({
// Post.find({
// Post.create({
//     title: "My Third Title",
//     content: "My third Content",
// }, (error, post) => {
//     console.log(error, post)
// })