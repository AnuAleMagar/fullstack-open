const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper=require('./test_helper')
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
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
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const responseAgain = await api.get("/api/blogs");
  assert.strictEqual(responseAgain.body.length, helper.initialBlogs.length + 1);
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


test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(n => n.title)
  assert(!titles.includes(blogToDelete.content))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const updatedData={likes:blogToUpdate.likes+100}
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)


  const blogsUpdated = await helper.blogsInDb()
  const updatedBlog=blogsUpdated.find(blog=>blog.id===blogToUpdate.id)


  assert.strictEqual(updatedBlog.likes,updatedData.likes)
})

after(async () => {
  await mongoose.connection.close();
});
