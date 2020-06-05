const { Schema, model } = require('mongoose')

const productSchema = Schema({
  barcode: {},
  name: {
    type: String,
    trim: true,
    require: true
  },
  detail: {
    type: String,
    trim: true,
    require: false
  },
  image: {
    type: String,
    trim: true,
    require: false
  },
  unitMessureMajor: {
    type: String,
    trim: true,
    require: true,
    enum: ['pieza', 'bulto', 'caja']
  },
  quantityByMessureMajor: {
    type: Number,
    required: true,
    min: 0
  },
  unitMessureMedia: {
    type: String,
    trim: true,
    require: true,
    enum: ['pieza', 'kilogramos']
  },
  quantityByMessureMedia: {
    type: Number,
    required: true,
    min: 0
  },
  unitMessureMinor: {
    type: String,
    trim: true,
    require: true,
    enum: ['pieza', 'Gramos']
  },
  quantityByMessureMinor: {
    type: Number,
    required: true,
    min: 0
  },
  stockMax: {
    type: Number,
    required: true,
    min: 0
  },
  stockMin: {
    type: Number,
    required: true,
    min: 0
  },
  currentQuantity: {
    type: Number,
    required: true,
    min: 0
  },
  pricePurchasedByUnit: {
    type: Number,
    required: true,
    min: 0
  },
  porcentageOfProfit: {
    type: Number,
    required: true,
    min: 0
  },
  priceSuggedByUnit: {
    type: Number,
    required: true,
    min: 0
  },
  dateOfExpiry: {
    type: Date,
    required: true
  },
  category: {
    type: Schema.ObjectId,
    ref: 'Category'
  },
  provider: {
    type: Schema.ObjectId,
    ref: 'Provider'
  },
  store: {
    type: Schema.ObjectId,
    ref: 'Store'
  }
}, {
  timestamps: true
})

module.exports = model('Product', productSchema)
