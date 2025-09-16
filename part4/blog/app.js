const express = require('express')
const config=require('./utils/config')
const app = express()
const Blog=require('./models/blog')
const mongoose=require('mongoose')
const blogRouter=require('./controllers/blogs')
const userRouter=require('./controllers/users')

mongoose.connect(config.MONGODB_URL)

app.use(express.json())
app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)

module.exports=app