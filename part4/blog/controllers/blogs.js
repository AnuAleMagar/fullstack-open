const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);
    const blog = new Blog({...request.body,user:request.user.id});
    if (!user) {
      return response
        .status(400)
        .json({ error: "UserId missing or not valid" });
    }
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});
blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    const blog = await Blog.findById(request.params.id);
    if(!blog){
       return response.status(404).json({ error: "blog not found" });
    }
     if (!blog.user || blog.user.toString() !== decodedToken.id.toString()) {
      return response.status(403).json({ error: "not authorized to delete this blog" });
    }
    if (blog.user.toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    }
  } catch (error) {
    next(error);
  }
});
blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const { likes } = request.body;
  await Blog.findByIdAndUpdate(
    id,
    { likes },
    { new: true, runValidators: true }
  );
  response.status(200).end();
});

module.exports = blogRouter;
