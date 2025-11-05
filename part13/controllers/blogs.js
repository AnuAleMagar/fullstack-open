const router = require("express").Router();
const { Blog } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const blog = await Blog.create(req.body);
  res.json(blog);
});

router.put("/:id", blogFinder, async (req, res) => {
  try {
    if (req.blog) {
      req.blog.likes=req.body.likes
      await req.blog.save()
      res.json(req.blog)
    }else{
      return res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    console.error("Error Updating blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", blogFinder, async (req, res) => {
  try {
    if (!req.blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    await req.blog.destroy();
    res.json({
      message: `Deleted blog with ID ${req.blog.id}`,
      blog: req.blog,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
