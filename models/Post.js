import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    date: { type: Date, default: Date.now },
    post_image: { type: String, require: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },




    comments: [{ body: String, date: Date }],
    hidden: Boolean,
    // meta: {
    //     votes: Number,
    //     favs: Number
    // }
});


export default mongoose.model('Post', PostSchema)
