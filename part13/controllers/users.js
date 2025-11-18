const router = require("express").Router();
const { User,Blog } = require("../models");

const userFinder = async (req, res, next) => {
   req.user = await User.findOne({ where: { username: req.params.username } });
  next();
};

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
        model: Blog
      }
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const user = await User.create(req.body);
  res.json(user);
});

router.put("/:username", userFinder, async (req, res) => {
  if (req.user) {
    req.user.username = req.body.username;
    await req.user.save();  
    res.json(req.user);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

module.exports = router;