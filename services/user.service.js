const db = require('../db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET = process.env.JWT_SECRET || "asd";


login = async (username, password) => {
  const result = await db.query(
    `SELECT * FROM users WHERE username = $1`, [username]
  );
  const user = result.rows[0];
  
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }
  
  let valid = false;
  if (user.role === 'admin'){
      valid = user.password === password
      
    }else{
      valid = await bcrypt.compare(password, user.password);
  }
  if (!valid) {
    const err= new Error("Password noto'g'ri")
    err.status = 401
    throw err
  };

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });
  return {
    token,
    user: {
      username: user.username,
      role: user.role,
      banned: user.banned
    }
  };
};


async function getUser(){
    const result = await db.query(
        "SELECT * FROM users"
    )

    return result.rows;
}

async function getUserById(id){
    const result = await db.query(
        `SELECT * FROM users WHERE id=$1`, [id]
    )

    return result.rows
}

async function createUser(user) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  try{
    const result = await db.query(
    `INSERT INTO users (username, password, role, banned)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [user.username, hashedPassword, user.role, false]
  );
  return result.rows[0];
  }catch(Err){
    throw Err
  }
}

async function deleteUser(id) {
  const result = await db.query(
    `DELETE FROM users WHERE id=$1`,
    [id]
  );

  if (result.rowCount === 0) {
    const err = new Error("Foydalanuvchi topilmadi");
    err.status = 404;
    throw err;
  }

  return result;
}

async function banUser(id){
  const result = await db.query(
    `UPDATE users SET banned=$1 WHERE id=$2`, [true, id]
  )
  if (result.rowCount === 0) {
    const err = new Error("Foydalanuvchi topilmadi");
    err.status = 404;
    throw err;
  }
  return result;
  
}
async function freeUser(id){
  const result = await db.query(
    `UPDATE users SET banned=$1 WHERE id=$2`, [false, id]
  )
  if (result.rowCount === 0) {
    const err = new Error("Foydalanuvchi topilmadi");
    err.status = 404;
    throw err;
  }
  return result;
  
}

async function updateUser(id, username, email, role, password){
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.query(`
    UPDATE users SET username=$1, password=$2, role=$3, banned=$4 WHERE=$5 RETURNING *`, [username, hashedPassword, role, banned])
  
    return result.rows[0];
}

module.exports = {getUser, getUserById, login, createUser, deleteUser, banUser, freeUser, updateUser}