import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },

    date: { type: Date, default: Date.now },
    user_image: { type: String, require: true }
});


export default mongoose.model('User', UserSchema)
