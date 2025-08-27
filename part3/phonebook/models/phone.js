const mongoose = require('mongoose')
const url=process.env.MONGODB_URL;

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Phone = mongoose.model('Phone', phoneSchema)
module.exports=Phone