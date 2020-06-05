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

/**
 *
 * @param {String} email - The email address
 * @param {String} password - The password
 */
async function login (email, password) {
  const user = await User.findOne({ email })
  if (!user) throw new Error('Invalid Credentials')
  const { _id, role, password: hash } = user
  const isPasswordCorrect = await bcrypt.compare(password, hash)
  if (!isPasswordCorrect) throw new Error('Invalid Credentials')

  return jwt.sign({ id: _id, role })
}

function getAllUser () {
  return User.find({})
}

/**
 *
 * @param {String} id - id of user
 */
function getById (id) {
  return User.findById(id)
}

function getUserByToken (token) {
  const tokenDecode = jwt.verify(token)
  const { id } = tokenDecode
  return User.findOne({ _id: id }).select('name lastName email role subscription carbonFootprint')
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
  getUserByToken,
  getAllUser,
  getById,
  deleteById,
  updateById
}
