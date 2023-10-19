const User = require('./users.mongo');
require('dotenv').config();
const axios = require('axios');

async function createUsers(req,res){
    try{
        const username = req.params.username;
        const response  = await axios.get(`https://api.github.com/users/${username}`);
        const resData = response.data;
        const existingUser = await User.findOne({name:resData.login});
        console.log(existingUser);
        if(existingUser){
            return res.send('User already exists');
        }else{
            const user = await User.create({
                name:resData.login,
                id:resData.id,
                repos_url:resData.repos_url,
                gists_url:resData.gists_url,
                starred_url:resData.starred_url,
            })
            //await user.save();
            return res.json(user);
        }
    
    }catch(error){
        throw new Error(error);
    }
}

module.exports = {
    createUsers,
}