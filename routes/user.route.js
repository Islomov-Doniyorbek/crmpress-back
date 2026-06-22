const express = require('express')
const router = express.Router()

const { getUsers, getUserById, login , createUser, deleteUser, banUser, freeUser, updateUser} = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/users', authMiddleware, getUsers)
router.get('/users/:id', authMiddleware, getUserById)
router.post('/login', login)
router.post('/user/create', createUser)
router.delete('/user/delete/:id', deleteUser)
router.patch('/user/ban/:id', banUser)
router.patch('/user/free/:id', freeUser)
router.put('user/update/:id', updateUser)

module.exports = router