const express = require('express');
require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const app = express();
const { createUsers } = require('./users.model');

app.get('/github/users', async (req,res) => {
    try{
        const response  = await axios.get('https://api.github.com/users');
        const resData = response.data;
        res.send(resData);
    }catch(error){
        throw new Error(error);
    }
})

app.get('/github/users/:username', createUsers)

async function mongoConnect(){
    await(mongoose.connect(process.env.MONGO_URI));
    mongoose.connection
        .once('open',() => console.log('Mongoose DB connected successfully'))
        .on('error',(error) => console.log(error));
}



async function  startServer(){
    await mongoConnect();
    app.listen(4000,() => {
        console.log('App is running..')
    })
}

startServer();
