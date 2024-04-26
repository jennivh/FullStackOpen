const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:  {
        type: String,
        minlength: [3, 'username too short'],
        required: true,
        unique: true
      },
    password: {
        type: String,
        minlength: [3, 'password too short'],
        required: true,
      },
    name: String,
    blogs: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Blog'
      }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.password
    }
  })



module.exports = mongoose.model('User', userSchema)