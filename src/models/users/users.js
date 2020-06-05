const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  firstName: {
    type: String,
    require: true,
    trim: true
  },
  lastName: {
    type: String,
    require: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    require: true,
    unique: true,
    match: ['/^([a-zA-Z0-9_-.]+)@([a-zA-Z0-9_-.]+).([a-zA-Z]{2,5})$/', 'This email is not valid']
  },
  password: {
    type: String,
    require: true,
    minLength: 8
  },
  phone: {
    type: String,
    require: true,
    trim: true,
    match: ['/+?1?/d{10}', 'This phone number is not valid']
  },
  role: {
    type: String,
    enum: ['administrator', 'seller'],
    default: 'administrator'
  },
  store: [{
    type: Schema.Types.ObjectId,
    ref: 'Store'
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)
