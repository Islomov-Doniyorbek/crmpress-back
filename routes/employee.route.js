const express = require('express')
const router = express.Router()

const employeeService = require('../services/employee.service')
const { getEmployees, createEmployee, deleteEmployee, updateEmployee } = require('../controllers/employee.controller')

router.get('/employees', getEmployees)
router.post('/employee/create', createEmployee)
router.delete('/employee/delete/:id', deleteEmployee)
router.put('/employee/update/:id', updateEmployee)

module.exports = router