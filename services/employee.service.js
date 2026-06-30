const db = require('../db')

async function getEmployees(userId)
{
    const result = await db.query(
        'SELECT * FROM employee WHERE user_id =$1', [userId]
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

async function deletEmployee(id) {
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


async function updateEmployee(id, name, email, status, role){
  
  console.log('Query:', [name, email, role, status, id])
    const result = await db.query(`
      UPDATE employee SET name=$1, email=$2, status=$3, role=$4 WHERE id=$5 RETURNING *`, [name, email, status, role, id])
      
      
      return result.rows[0];
      
}

module.exports = {getEmployees, createEmployee, deletEmployee, updateEmployee}