const express = require('express')
const router = express.Router()

const employeeService = require('../services/employee.service')
const { getEmployees } = require('../controllers/employee.controller')

router.get('/employees', getEmployees)

module.exports = router