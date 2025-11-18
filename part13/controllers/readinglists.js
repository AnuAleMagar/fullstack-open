const router = require("express").Router();
const { User, Blog, ReadingList } = require("../models");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  }
  next();
};

const readingListFinder = async (req, res, next) => {
  req.readingList = await ReadingList.findByPk(req.params.id);
  next();
};

router.post("/", async (req, res) => {
  const { blogId, userId } = req.body;

  const user = await User.findByPk(userId);
  const blog = await Blog.findByPk(blogId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }

  await user.addReading(blog);

  res.status(201).json({ message: "Blog added to reading list" });
});

router.put("/:id", tokenExtractor, readingListFinder, async (req, res) => {
  let decodedToken;
  try {
    decodedToken = jwt.verify(req.token, SECRET);
  } catch (error) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  if (!decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  if (!req.readingList) {
    return res.status(404).json({ error: "Reading list entry not found" });
  }

  if (req.readingList.userId !== decodedToken.id) {
    return res.status(403).json({ error: "unauthorized" });
  }

  req.readingList.read = req.body.read;
  await req.readingList.save();

  res.json(req.readingList);
});

module.exports = router;