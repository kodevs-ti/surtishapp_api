const { Schema, model } = require('mongoose')

const storeSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  location: {
    type: String,
    trim: true,
    require: true
  }
}, {
  timestamps: true
})

module.exports = model('Store', storeSchema)
