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

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "15m" });
  return token;
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


module.exports = {getUser, getUserById, login}