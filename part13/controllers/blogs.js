const router = require("express").Router();
const { Blog, User } = require("../models");
const { Op } = require("sequelize");
const sessionValidator = require("../middleware/sessionValidator");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
    ];
  }

  const blogs = await Blog.findAll({
    where,
    include: {
      model: User,
    },
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

router.post("/", sessionValidator, async (req, res) => {
  console.log(req.body);
  const blog = await Blog.create({ ...req.body, userId: req.user.id });
  res.json(blog);
});

router.put("/:id", sessionValidator, blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes;
  await req.blog.save();
  res.json(req.blog);
});

router.delete("/:id", sessionValidator, blogFinder, async (req, res) => {
  if (req.blog.userId !== req.user.id) {
    return res.status(401).json({ error: "unauthorized" });
  }
  await req.blog.destroy();
  res.json({ message: `Deleted blog with ID ${req.blog.id}` });
});
module.exports = router;
