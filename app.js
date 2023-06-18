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
import admin from './routes/admin/index.js'
// Date Formater

import session from 'express-session'
import MongoStore from 'connect-mongo'
import methodOverride from 'method-override'
// Helpers
import { dateFormat, limit, isSelected, truncate } from './helpers/hbs.js'


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



// User data
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true },
  // store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/nodeblog_db' })

}))


// File Upload
app.use(fileUpload())

// Static Files
app.use(express.static('public'))
// Define Method
app.use(methodOverride('_method'))




// Templates - handlebars, helpers
app.engine('handlebars', exphbs({
  helpers: {
    dateFormat: dateFormat,
    isSelected: isSelected,
    limit: limit,
    truncate: truncate,
  }
}));
app.set('view engine', 'handlebars');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// Page Display Link Middleware
app.use((req, res, next) => {

  const { userId } = req.session

  if (userId) {
    res.locals = {
      displayLink: true
    }
  }
  else {
    res.locals = {
      displayLink: false
    }
  }
  next()
})


// Falsh massage middleware
app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash
  delete req.session.sessionFlash
  next()
})


// Requests Router
app.use("/", main)
app.use("/posts", posts)
app.use("/users", users)
app.use("/admin", admin)




app.listen(port, () => {
  console.log(`Server Running http://${host}:${port}`)
})