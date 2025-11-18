const router = require("express").Router();
const { User, Blog, ReadingList } = require("../models");
const sessionValidator = require("../middleware/sessionValidator");

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

router.put("/:id", sessionValidator, readingListFinder, async (req, res) => {
  if (!req.readingList) {
    return res.status(404).json({ error: "Reading list entry not found" });
  }

  if (req.readingList.userId !== req.user.id) {
    return res.status(403).json({ error: "unauthorized" });
  }

  req.readingList.read = req.body.read;
  await req.readingList.save();

  res.json(req.readingList);
});

module.exports = router;
