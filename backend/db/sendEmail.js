const mongoose = require('mongoose')

// Mongoose Model
var sendEmailSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,

  },
  keyword: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }

})


// Export Mongoose "User" model
module.exports = mongoose.model('sendEmail', sendEmailSchema)
