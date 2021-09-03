const mongoose = require('mongoose'),
      bcrypt = require('bcrypt')

// Mongoose Model
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    minlength: 2,
    maxlength: 16,
    lowercase: true,
    required: true,

  },
  password: {
    type: String,
    required: true,
  }
})

// Hash password before saving
userSchema.pre('save', function(next) {
  var user = this

  // If not registration
  if ( !user.isModified('password') ) return next()

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      next()
    });
  });
})


// Export Mongoose "User" model
module.exports = mongoose.model('User', userSchema)
