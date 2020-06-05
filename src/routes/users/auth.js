const { Router } = require('express')

const { users } = require('../../usesCases')

const { auth } = require('../../middlewares')

const ROUTER = Router()

ROUTER.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const token = await users.login(email, password)
    res.json({
      success: true,
      data: {
        token
      }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      data: {
        message: error.message
      }
    })
  }
})

ROUTER.get('/me', auth, async (req, res) => {
  try {
    const { authorization: token } = req.headers
    const user = await users.getUserByToken(token)
    res.json({
      success: true,
      data: {
        user
      }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      data: {
        message: error.message
      }
    })
  }
})

module.exports = ROUTER
