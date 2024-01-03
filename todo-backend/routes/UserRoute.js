const express = require("express");
const router = express();
const { User } = require("../db/index");
const userMiddleware = require("../middlewares/UserMiddleware");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.create({
    username,
    password,
  });

  return res.status(200).json({
    msg: `${user.username} created successfully`,
  });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.find({
    username,
    password,
  });

  console.log(user);
  console.log(process.env.JWT_SECRET);

  if (user) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    return res.status(200).json({
      token,
    });
  } else {
    return res.status(411).json({
      msg: "Incorrect email and password",
    });
  }
});

router.post("/add-todo",userMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const username = req.username;
    
    await User.updateOne(
      {
        username,
      },
      {
        $push: {
          todos: { title, description },
        },
      }
    );

    return res.status(200).json({
      msg: "todo added successfully",
    });
  } catch (e) {
    console.log(e);
  }
});

router.get("/todos", userMiddleware, async (req, res) => {
  const username = req.username;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(411).send("Cannot find the user");
  }

  const todos = user.todos;
  return res.status(200).json({
    todos,
  });
});

module.exports = router;
