const bcrypt = require('bcrypt')
const jwt = require('../../lib/jwt')
const { User } = require('../../models')

/**
 *
 * @param {Object} userData - User data
*/
async function signUp (userData) {
  const { email, password, confirmationPassword } = userData
  if (!email) throw new Error('Email address is required')
  if (!password) throw new Error('Password is required')
  if (password.length < 8) throw new Error('Password must be at greater than 8 characters')
  if (password !== confirmationPassword) throw new Error('Password is not matches')

  const userAlreadyExists = await User.findOne({ email: email })

  if (userAlreadyExists) throw new Error('Email is already in use')

  const hash = await bcrypt.hash(password, 10)

  return User.create({ ...userData, password: hash })
}

async function createWorker (dataWorker, idStore, role) {
  console.log(dataWorker)
  const { email, password, confirmationPassword } = dataWorker
  if (!email) throw new Error('Email address is required')
  if (!password) throw new Error('Password is required')
  if (password.length < 8) throw new Error('Password must be at greater than 8 characters')
  if (password !== confirmationPassword) throw new Error('Password is not matches')

  const userAlreadyExists = await User.findOne({ email: email })

  if (userAlreadyExists) throw new Error('Email is already in use')

  const hash = await bcrypt.hash(password, 10)

  return User.create({ ...dataWorker, password: hash, store: idStore, role })
}

/**
 *
 * @param {String} email - The email address
 * @param {String} password - The password
 */
async function login (email, password) {
  const user = await User.findOne({ email })
  if (!user) throw new Error('Invalid Credentials')
  const { _id, role, password: hash, store } = user
  const isPasswordCorrect = await bcrypt.compare(password, hash)
  if (!isPasswordCorrect) throw new Error('Invalid Credentials')

  return jwt.sign({ id: _id, role, store })
}

function getAll () {
  return User.find({})
    .populate('store')
    .select('firsName lastName email role store createdAt updatedAt')
}

/**
 *
 * @param {String} id - id of user
 */
function getById (id) {
  return User.findById(id)
    .populate('store')
    .select('firsName lastName email role store createdAt updatedAt')
}

/**
 *
 * @param {String} token - The token's user inside in req.user
 */
function getByToken (id) {
  return User.findOne({ _id: id })
    .select('name lastName email role subscription carbonFootprint')
}

function getAllByStore (idStore, userCurrent) {
  console.log('Hola')
  console.log(idStore)
  return User.find({ store: idStore, _id: { $ne: userCurrent }, role: { $ne: 'administrator' } })
    .select('firsName lastName email phone role createdAt updatedAt')
}

/**
 *
 * @param {String} id - id of user to delete
 */
function deleteById (id) {
  return User.findByIdAndRemove(id)
}

/**
 *
 * @param {String} id - id of user to update
 * @param {Object} newData - new data to update
 */
function updateById (id, newData) {
  return User.findByIdAndUpdate(id, newData, { new: true })
}

module.exports = {
  signUp,
  login,
  getAll,
  getById,
  deleteById,
  updateById,
  getByToken,
  createWorker,
  getAllByStore
}
