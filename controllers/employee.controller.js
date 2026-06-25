const employeeService = require('../services/employee.service')

async function getEmployees(req, res) {
    try {
        const employees = await employeeService.getEmployees()
        res.json({
            employees,
            status: 200
        }) 
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


async function createEmployee(req, res) {
    try {
        const result = await employeeService.createEmployee(req.body);
        res.json(result)
    }catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}

const deleteUser = async (req, res) => {
  try {
    const result = await employeeService.deleteUser(req.params.id);

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (err) {
    return res.status(err.status || 500).json({
      message: err.message
    });
  }
};

module.exports = {getEmployees, createEmployee, deleteUser}