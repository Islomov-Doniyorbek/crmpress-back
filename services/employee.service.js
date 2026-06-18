const db = require('../db')

async function getEmployees()
{
    const result = await db.query(
        'SELECT * FROM employee'
    );

    return result.rows
}

module.exports = {getEmployees}