const { Schema, model } = require('mongoose')

const providerSchema = Schema({
  name: {
    type: String,
    trim: true,
    require: true
  },
  contact: {
    type: String,
    trim: true,
    require: false
  },
  phone: {
    phone: {
      type: String,
      require: true,
      trim: true,
      match: ['/+?1?/d{10}', 'This phone number is not valid']
    }
  },
  daysOfVisit: [{
    type: String,
    enum: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
    require: false
  }],
  store: {
    type: Schema.ObjectId,
    ref: 'Store'
  }
}, {
  timestamps: true
})

module.exports = model('Provider', providerSchema)
