const db = require('../db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET = process.env.JWT_SECRET || "asd";


login = async (username, password) => {
  const result = await db.query(
    `SELECT * FROM users WHERE username = $1`, [username]
  );
  const user = result.rows[0];
  console.log(result);
  console.log(result);
  
  if (!user) throw new Error("User topilmadi");
  console.log(user);
  let valid = false;
  if (user.role === 'admin'){
      valid = user.password === password
      console.log("admin");
      
    }else{
      valid = await bcrypt.compare(password, user.password);
        console.log("user");
  }
  if (!valid) throw new Error("Password noto'g'ri");

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
  const result = await db.query(
    `INSERT INTO users (username, password, role, banned)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [user.username, user.password, user.role, false]
  );
  return result.rows[0];
}


module.exports = {getUser, getUserById, login, createUser}