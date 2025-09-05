const express = require('express')
const config=require('./utils/config')
const app = express()
const Blog=require('./models/blog')
const mongoose=require('mongoose')
const blogRouter=require('./controllers/blogs')


mongoose.connect(config.MONGODB_URL)

app.use(express.json())
app.use('/api/blogs',blogRouter)

module.exports=app