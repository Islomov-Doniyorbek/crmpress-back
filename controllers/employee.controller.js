const employeeService = require('../services/employee.service')

async function getEmployees(req, res) {
    try {
            const employees = await employeeService.getEmployees()
            res.json(employees)
            console.log(employees);
            
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {getEmployees}