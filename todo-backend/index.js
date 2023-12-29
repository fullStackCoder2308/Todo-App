const express = require("express");
const app = express();
const  {User}  = require("./db/index");
const { default: mongoose } = require("mongoose");
const UserRouter = require('./routes/UserRoute')
require('dotenv').config();

app.use(express.json())

app.use('/user',UserRouter);

//Todos routes and logic
// app.get('/todos',async(req,res) => {
//   const todos = await Todos.find();
//   return res.status(200).json(todos);
// })

// app.post('/todo',async(req,res) => {
//   const {title,description} = req.body;
//   const todo = await Todos.create({
//     title,
//     description,

//   }) 
//   return res.status(200).json({todo})
// })


app.listen(process.env.PORT,() => {
    console.log('server connected');
})