
const express = require('express')
const app = express()

const {PORT} =require('./util/config')
const blogRouter=require('./controllers/blogs')
const { connectToDatabase } = require('./util/db')
const errorHandler = require("./middleware/errorHandler");


app.use(express.json())
app.use('/api/blogs',blogRouter)
app.use(errorHandler);

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()