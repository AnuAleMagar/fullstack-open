const router = require("express").Router();
const { User, Blog, ReadingList } = require("../models");

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

module.exports = router;