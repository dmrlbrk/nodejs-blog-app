// const express = require('express') const path = require('path') const exphbs  = require('express-handlebars'); const mongoose = require('mongoose');

import express from 'express' // Express.js
import path from 'path'
import exphbs from 'express-handlebars'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
// Router
import main from './routes/main.js'
import posts from './routes/posts.js'
import users from './routes/users.js'
// Date Formater
import generateDate from './helpers/generateDate.js'


// Connect db
mongoose.connect('mongodb://127.0.0.1:27017/nodeblog_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log('db Connected!'));


// app
const app = express()
const port = 3000
const host = '127.0.0.1'

// File Upload
app.use(fileUpload())

// Static Files
app.use(express.static('public'))


// Templates - handlebars
app.engine('handlebars', exphbs({ helpers: { generateDate: generateDate } }));
app.set('view engine', 'handlebars');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// middleware
// const myMiddleware = (req, res, next) => {
//   console.log('myMiddleware')
//   next()
// }
// app.use('/', myMiddleware)





// Requests Router
app.use("/", main)
app.use("/posts", posts)
app.use("/users", users)




app.listen(port, () => {
  console.log(`Server Running http://${host}:${port}`)
})