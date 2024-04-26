const bcrypt = require("bcryptjs");
const userRouter = require("express").Router();
const User = require("../models/user");
const { default: mongoose } = require("mongoose");

userRouter.post("/", async (request, response) => {
  const { username, password, name } = request.body;
  if (!password || !username) {
    response.status(400).json({ error: "password or username missing" });
  } else if (password.length < 3 || username.length < 3) {
    response.status(400).json({ error: "password or username too short" });
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username: username,
      password: passwordHash,
      name: name
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  }
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.json(users);
});

module.exports = userRouter;
