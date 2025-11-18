const router = require("express").Router();
const { User, Blog } = require("../models");

const userFinder = async (req, res, next) => {
  req.user = await User.findOne({ where: { username: req.params.username } });
  next();
};

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
    },
  });
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: Blog,
        as: "readings",
        attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
        through: {
          attributes: ["read", "id"],
        },
      },
    ],
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const userJson = user.toJSON();
  if (userJson.readings) {
    userJson.readings = userJson.readings.map((blog) => {
      const joinData =
        blog.reading_list || blog.ReadingList || blog.readinglists;

      const { reading_list, ReadingList, ...blogData } = blog;

      return {
        ...blogData,
        readinglists: joinData
          ? [{ read: joinData.read, id: joinData.id }]
          : [],
      };
    });
  }

  res.json(userJson);
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
