const User = require('./users/users')
const Client = require('./users/clients')
const Store = require('./catalogs/stores')
const BranchStore = require('./catalogs/branchStores')
const Category = require('./catalogs/categories')
const Provider = require('./catalogs/providers')
const Product = require('./catalogs/products')
const Sale = require('./sales/sales')
const SaleTicket = require('./sales/salesTicket')

module.exports = {
  User,
  Client,
  Store,
  BranchStore,
  Category,
  Provider,
  Product,
  Sale,
  SaleTicket
}
