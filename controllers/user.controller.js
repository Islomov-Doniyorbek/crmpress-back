const userService =require('../services/user.service')



async function login(req, res) {
  const { username, password } = req.body;
  try {
    const result = await userService.login(username, password);
    res.json({
      token: result.token,
      user: result.user
    });
  } catch (err) {
    res.status(err.status | 400).json({
      message: err.message
    });
  }
}


async function getUsers(req, res) {
    try {
        const users = await userService.getUser();
        res.json({
            users,
            status: 200
        })
    }
    catch(err){
        res.status(500).json({
            message: "Internal Error, sorry" + err.message
        })
    }
}

async function getUserById(req, res){
    try {
        const {id} = req.params;
        const user = await userService.getUserById(id)
        
        res.json(user)
        console.log(user);
    }
    catch(err){
        res.json({
            message: err.message
        })
    }
}
const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json(user);
  } catch (err) {
    console.log(err);

    if (err.code === '23505') {
      return res.status(409).json({
        message: 'Username allaqachon mavjud'
      });
    }

    return res.status(err.status || 500).json({
      message: err.message || 'Server xatosi'
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);

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

const banUser = async (req, res) => {
  try {
    const result = await userService.banUser(req.params.id)

    return res.status(200).json({
      success: true,
    });
  }catch(err){
    return res.status(err.status || 404).json(err.message)
  }
}
const freeUser = async (req, res) => {
  try {
    const result = await userService.freeUser(req.params.id)

    return res.status(200).json({
      success: true,
      message: "User spamdan chiqarildi"
    });
  }catch(err){
    return res.status(err.status || 404).json(err.message)
  }
}


const updateUser = async (req, res) => {
  try {
    const result = await userService.updateUser(req.params.id, req.body.username, req.body.password, req.body.role, req.body.banned);
    console.log(result);
    
    return res.status(200).json({
      result
    })
  }catch(err){
    res.json(err)
  }
}
module.exports = {getUsers, getUserById, login, createUser, deleteUser, banUser, freeUser, updateUser}