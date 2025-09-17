const express = require('express')
const config=require('./utils/config')
const app = express()
const Blog=require('./models/blog')
const mongoose=require('mongoose')
const blogRouter=require('./controllers/blogs')
const userRouter=require('./controllers/users')
const loginRouter=require('./controllers/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')



logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URL)

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs',middleware.userExtractor,blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports=app