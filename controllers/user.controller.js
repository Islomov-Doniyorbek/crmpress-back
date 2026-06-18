const userService =require('../services/user.service')



async function login(req, res){
    const {username, password} = req.body;
    console.log(req.body);
    

    try{
        const result = await userService.login(username, password)
        
        res.json({
            token: result.token,
            user: result.user
        })
    }catch(Err){
        res.json({
            message: Err.message
        }).status(400)
    }
}


async function getUsers(req, res) {
    try {
        const users = await userService.getUser();
        res.json({
            users,
            status: 200
        })
        console.log(users);
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

async function createUser(req, res) {
    try{
        const user = req.body;

        const newuser = userService.createUser(user);
        res.json({
            message: "User created successfull",
            newUser: newuser
        })
    }catch(err){
        console.log(err);
        
        res.json({
            message: err.message
        }).status(500)
    }
}

module.exports = {getUsers, getUserById, login, createUser}