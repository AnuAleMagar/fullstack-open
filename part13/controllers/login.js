const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

const  SECRET  = process.env.SECRET
const User = require('../models/user');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  
  const passwordCorrect = password === SECRET;

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid username or password' });
  }

  const userForToken = {
    username, 
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;