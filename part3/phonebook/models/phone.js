const mongoose = require('mongoose')
const url=process.env.MONGODB_URL;

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: Number,
})
phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Phone = mongoose.model('Phone', phoneSchema)
module.exports=Phone