const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true
  },
  title: {
    type: String, 
    required: true
  },
  content: {
    type: String,
    required: true,
    minlength: 1
  },
  category: {
    type: String,
  },
  likes: {
    type: Number,
  },
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Post', postSchema)