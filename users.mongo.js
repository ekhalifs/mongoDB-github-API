const mongoose = require('mongoose');
const usersSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    repos_url:{
        type:String,
        required:true
    },
    gists_url:{
        type:String,
        required:true
    },
    starred_url:{
        type:String,
        required:true
    }
    
})

module.exports = mongoose.model('User',usersSchema)