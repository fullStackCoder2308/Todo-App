const express = require("express");
const app = express();
const  {User}  = require("./db/index");
const { default: mongoose } = require("mongoose");
const UserRouter = require('./routes/UserRoute')
require('dotenv').config();
const cors = require("cors")


app.use(cors());

app.use(express.json())

app.use('/user',UserRouter);



app.listen(process.env.PORT,() => {
    console.log('server connected');
})