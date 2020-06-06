const storesRouters = require('./catalogs/stores')
const usersRouters = require('./users/users')
const authRouters = require('./users/auth')
const clientsRouters = require('./users/clients')
const providersRouters = require('./catalogs/providers')
const categoriesRouters = require('./catalogs/categories')

module.exports = {
  storesRouters,
  usersRouters,
  authRouters,
  clientsRouters,
  providersRouters,
  categoriesRouters
}
