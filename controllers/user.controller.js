const userService  =require('../services/user.service')



async function login(req, res){
    const {username, password} = req.body;
    console.log(req.body);
    

    try{
        const token = await userService.login(username, password)
        res.json({token})
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

module.exports = {getUsers, getUserById, login}