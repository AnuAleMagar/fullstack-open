const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

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

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, initialBlogs.length);
});

after(async () => {
  await mongoose.connection.close();
});
