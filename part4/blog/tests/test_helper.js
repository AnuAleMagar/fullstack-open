const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "A Guide to MongoDB",
    author: "Bob Johnson",
    url: "https://example.com/guide-to-mongodb",
    likes: 85,
  },
  {
    title: "Mastering Express.js",
    author: "John Doe",
    url: "https://example.com/mastering-expressjs",
    likes: 95,
  },
];
const initialUsers = [
  {
    "name": "Alice Johnson",
    "username": "alice",
    "password": "password123"
  },
  {
    "name": "Brian Smith",
    "username": "bsmith88",
    "password": "qwerty!789"
  },
];
const nonExistingId = async () => {
  const blog = new Blog({ title: "Deleting this",
    author: "John Doe",
    url: "https://example.com/mastering-expressjs",
    likes: 999,})
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb=async ()=>{
  const users=await Users.find({})
  return users.map(user=>user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb,usersInDb,initialUsers
}