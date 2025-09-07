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

test("unique identifier property is named id", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  assert.ok(response.body[0].id, "id property is missing");
});

test("http post request", async () => {
  const newBlog = {
    title: "A Guide from testing",
    author: "Bob Johnson",
    url: "https://example.com/guide-to-mongodb",
    likes: 88,
  };
  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const responseAgain = await api.get("/api/blogs");
  assert.strictEqual(responseAgain.body.length, initialBlogs.length + 1);
});
test("if likes property is missing from the request,it will default to value 0", async () => {
  const newBlogWithLikeMissing = {
    title: "Testing for blog with like missing",
    author: "Fullstack",
    url: "https://example.com/guide-to-mongodb",
    
  };
  const response = await api
    .post("/api/blogs")
    .send(newBlogWithLikeMissing)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  assert.strictEqual(response.body.likes, 0);
});
test("if title or url property are missing from the request,it will respondes with the status code 400", async () => {
  const newBlogWithTitleMissing = {
    author: "Fullstack",
    url: "https://example.com/guide-to-mongodb",
    
  };
  const response = await api
    .post("/api/blogs")
    .send(newBlogWithTitleMissing)
    .expect(400)
    .expect("Content-Type", /application\/json/);

});
after(async () => {
  await mongoose.connection.close();
});
