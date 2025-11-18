const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const SECRET = process.env.SECRET;
const User = require("../models/user");
const { Session } = require("../models");
const sessionValidator = require("../middleware/sessionValidator");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  const passwordCorrect = password === SECRET;

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "invalid username or password" });
  }

  if (user.disabled) {
    return res.status(401).json({ error: "user disabled" });
  }

  const userForToken = {
    username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  await Session.create({
    token,
    userId: user.id,
  });

  res.status(200).send({ token, username: user.username, name: user.name });
});

router.delete("/", sessionValidator, async (req, res) => {
  const authorization = req.get("authorization");
  const token = authorization.replace("Bearer ", "");

  await Session.destroy({ where: { token } });

  res.status(204).end();
});

module.exports = router;
