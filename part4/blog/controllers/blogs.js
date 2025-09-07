const blogRouter = require("express").Router();
const Blog = require("../models/blog");
blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    if (error.name === "ValidationError") {
      return response.status(400).json({ error: error.message });
    }
    response.status(500).json({ error: "Something went wrong" });
  }
});
module.exports = blogRouter;
