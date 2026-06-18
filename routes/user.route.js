const express = require('express')
const router = express.Router()

const { getUsers, getUserById, login , createUser} = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/users', authMiddleware, getUsers)
router.get('/users/:id', authMiddleware, getUserById)
router.post('/login', login)
router.post('/user/create', createUser)

module.exports = router