const router = require("express").Router();
const { Blog, User } = require("../models");
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '');
  }
  next();
};

router.get("/", tokenExtractor, async (req, res) => {
  const blogs = await Blog.findAll({
    include: {
      model: User
    }
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res) => {
  console.log(req.body);
  const decodedToken = jwt.verify(req.token, SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  const blog = await Blog.create({ ...req.body, userId: decodedToken.id });
  res.json(blog);
});

router.put("/:id", tokenExtractor, blogFinder, async (req, res) => {
  const decodedToken = jwt.verify(req.token, SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  req.blog.likes = req.body.likes;
  await req.blog.save();
  res.json(req.blog);
});

router.delete("/:id", tokenExtractor, blogFinder, async (req, res) => {
  const decodedToken = jwt.verify(req.token, SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  if (req.blog.userId !== decodedToken.id) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  await req.blog.destroy();
  res.json({ message: `Deleted blog with ID ${req.blog.id}` });
});
module.exports = router;
