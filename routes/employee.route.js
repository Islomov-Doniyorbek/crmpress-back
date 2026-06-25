const express = require('express')
const router = express.Router()

const employeeService = require('../services/employee.service')
const { getEmployees, createEmployee } = require('../controllers/employee.controller')

router.get('/employees', getEmployees)
router.post('/employee/create', createEmployee)

module.exports = router