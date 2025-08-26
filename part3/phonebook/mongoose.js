require('dotenv').config();

const mongoose = require('mongoose')
const url=process.env.MONGODB_URL;

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Phone = mongoose.model('Phone', phoneSchema)

const phone = new Phone({
  name: 'Aayan',
  number: 980222222,
})

phone.save().then(result => {
  console.log('number saved!')
})
Phone.find({}).then(result => {
  result.forEach(phone => {
    console.log(phone)
  })
  mongoose.connection.close()
})