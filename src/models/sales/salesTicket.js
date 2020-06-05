const { Schema, model } = require('mongoose')

const saleSticketSchema = Schema({
  product: {
    type: Schema.ObjectId,
    ref: 'Product'
  },
  sale: {
    type: Schema.ObjectId,
    ref: 'Sale'
  },
  quantityProduct: {
    type: Number,
    require: true,
    min: 0
  },
  unitPrice: {
    type: Number,
    require: true,
    min: 0
  },
  priceTotal: {
    type: Number,
    require: true,
    min: 0
  },
  store: {
    type: Schema.ObjectId,
    ref: 'Store'
  }
}, {
  timestamps: true
})

module.exports = model('SaleTickte', saleSticketSchema)
