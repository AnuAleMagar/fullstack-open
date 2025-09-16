const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users);
});

userRouter.post("/", async (request, response, next) => {
  try {
    const { name, username, password } = request.body;
    if (!password) {
      return response.status(400).json({ error: "password is required" });
    }
    if (password.length < 3) {
      return response
        .status(400)
        .json({ error: "Password must be at least 3 characters long" });
    }
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username,
      name,
      passwordHash,
    });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
