const express = require('express')
const router = express.Router()

const employeeService = require('../services/employee.service')
const { getEmployees, createEmployee, deleteUser } = require('../controllers/employee.controller')

router.get('/employees', getEmployees)
router.post('/employee/create', createEmployee)
router.delete('/employee/delete/:id', deleteUser)

module.exports = router