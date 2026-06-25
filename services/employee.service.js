const db = require('../db')

async function getEmployees()
{
    const result = await db.query(
        'SELECT * FROM employee'
    );

    return result.rows
}


async function createEmployee(empl) {
    const result = await db.query(
    `INSERT INTO employee (user_id, name, email, status, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`, [empl.user_id, empl.name, empl.email, empl.status, empl.role]
    )
    console.log(result);
    
    return result.rows[0]
}

async function deleteUser(id) {
  const result = await db.query(
    `DELETE FROM employee WHERE id=$1`,
    [id]
  );

  if (result.rowCount === 0) {
    const err = new Error("Xodim topilmadi");
    err.status = 404;
    throw err;
  }

  return result;
}

module.exports = {getEmployees, createEmployee, deleteUser}