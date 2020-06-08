const { Product } = require('../../models')

function create (dataProduct, store) {
  const {
    unitMeasureMajor,
    quantityByMeasureMajor,
    quantityByMeasureMedia
  } = dataProduct

  let unitMeasureMedia = ''
  let unitMeasureMinor = ''
  let quantityByMeasureMinor = 0
  let currentQuantity = 0

  //   const conversionMedia = {
  //     bulto: 'kilogramos',
  //     pieza: 'kilogramos',
  //     caja: 'pieza'
  //   }
  //   const conversionFinal = {
  //     kiligramos: 'gramos',
  //     pieza: 'pieza'
  //   }

  if (unitMeasureMajor === 'bulto' || unitMeasureMajor === 'pieza') {
    unitMeasureMedia = 'kilogramos'
    unitMeasureMinor = 'gramos'
    quantityByMeasureMinor = (quantityByMeasureMajor * 1000) * quantityByMeasureMedia
  }

  if (unitMeasureMajor === 'caja') {
    unitMeasureMedia = 'pieza'
    unitMeasureMinor = 'pieza'
    quantityByMeasureMinor = quantityByMeasureMajor * quantityByMeasureMedia
  }

  currentQuantity = quantityByMeasureMinor

  return Product.create({
    ...dataProduct,
    store,
    unitMeasureMajor,
    quantityByMeasureMajor,
    unitMeasureMedia,
    quantityByMeasureMedia,
    unitMeasureMinor,
    quantityByMeasureMinor,
    currentQuantity
  })
}

function getAll () {
  return Product.find({})
}

function getByStore (store) {
  return Product.find({ store })
}

function getById (id) {
  return Product.findById(id)
}

function deleteById (id) {
  return Product.findByIdAndRemove(id)
}

function updateById (id, newData) {
  const {
    unitMeasureMajor,
    quantityByMeasureMajor,
    quantityByMeasureMedia
  } = newData

  let unitMeasureMedia = ''
  let unitMeasureMinor = ''
  let quantityByMeasureMinor = 0
  let currentQuantity = 0

  //   const conversionMedia = {
  //     bulto: 'kilogramos',
  //     pieza: 'kilogramos',
  //     caja: 'pieza'
  //   }
  //   const conversionFinal = {
  //     kiligramos: 'gramos',
  //     pieza: 'pieza'
  //   }

  if (unitMeasureMajor === 'bulto' || unitMeasureMajor === 'pieza') {
    unitMeasureMedia = 'kilogramos'
    unitMeasureMinor = 'gramos'
    quantityByMeasureMinor = (quantityByMeasureMajor * 1000) * quantityByMeasureMedia
  }

  if (unitMeasureMajor === 'caja') {
    unitMeasureMedia = 'pieza'
    unitMeasureMinor = 'pieza'
    quantityByMeasureMinor = quantityByMeasureMajor * quantityByMeasureMedia
  }

  currentQuantity = quantityByMeasureMinor

  return Product.findByIdAndUpdate(
    id,
    {
      ...newData,
      unitMeasureMajor,
      quantityByMeasureMajor,
      unitMeasureMedia,
      quantityByMeasureMedia,
      unitMeasureMinor,
      quantityByMeasureMinor,
      currentQuantity
    },
    { new: true }
  )
}

function addImage (id, image) {
  return Product.findByIdAndUpdate(id, image, { new: true })
}

module.exports = {
  create,
  getAll,
  getByStore,
  getById,
  deleteById,
  updateById,
  addImage
}
