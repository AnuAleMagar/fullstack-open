const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const api = supertest(app);
let token;
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();

  await api.post("/api/users").send({
    username: "test",
    name: "Test",
    password: "password",
  });

  const loginResponse = await api.post("/api/login").send({
    username: "test",
    password: "password",
  });

  token = loginResponse.body.token;
});

test("blogs are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
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
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const responseAgain = await api.get("/api/blogs");
  assert.strictEqual(responseAgain.body.length, helper.initialBlogs.length + 1);
});
test("if a token is not provided,a blog fails with the proper status code 401 Unauthorized  ", async () => {
  const newBlogWithLikeMissing = {
    title: "Testing for blog without token passing in header",
    author: "Fullstack",
    url: "https://example.com/guide-to-mongodb",
    likes:100,
  };
  const response = await api
    .post("/api/blogs")
    .send(newBlogWithLikeMissing)
    .expect(401)
    .expect("Content-Type", /application\/json/);
  assert.ok(response.body.error.includes("token invalid"));
});
test("if likes property is missing from the request,it will default to value 0", async () => {
  const newBlogWithLikeMissing = {
    title: "Testing for blog with like missing",
    author: "Fullstack",
    url: "https://example.com/guide-to-mongodb",
  };
  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
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
    .set("Authorization", `Bearer ${token}`)
    .send(newBlogWithTitleMissing)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("a blog can be deleted", async () => {
  const newBlogTobeDeleted = {
    title: "A Guide from testing",
    author: "Bob Johnson",
    url: "https://example.com/guide-to-mongodb",
    likes: 88,
  };
  const createdBlog = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlogTobeDeleted)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogToDelete = createdBlog.body;
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  const titles = blogsAtEnd.map((n) => n.title);
  assert(!titles.includes(blogToDelete.title));
});

test("a blog can be updated", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  const updatedData = { likes: blogToUpdate.likes + 100 };
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set("Authorization", `Bearer ${token}`)
    .send(updatedData)
    .expect(200);

  const blogsUpdated = await helper.blogsInDb();
  const updatedBlog = blogsUpdated.find((blog) => blog.id === blogToUpdate.id);

  assert.strictEqual(updatedBlog.likes, updatedData.likes);
});

after(async () => {
  await mongoose.connection.close();
});
