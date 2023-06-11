import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    date: { type: Date, default: Date.now },
    
    post_image: { type: String, require: true},



    comments: [{ body: String, date: Date }],
    author: String,  // String is shorthand for {type: String}
    hidden: Boolean,
    // meta: {
    //     votes: Number,
    //     favs: Number
    // }
});


export default mongoose.model('Post', PostSchema)
