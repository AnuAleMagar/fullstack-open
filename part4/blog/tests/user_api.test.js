const User = require("../models/user");
const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const api = supertest(app);
const bcrypt = require("bcrypt");
beforeEach(async () => {
  await User.deleteMany({});
  let userObject = { ...helper.initialUsers[0] };
  let passwordHash = await bcrypt.hash(userObject.password, 10);
  userObject.passwordHash = passwordHash;
  delete userObject.password;
  userObject = new User(userObject);

  await userObject.save();
  userObject = { ...helper.initialUsers[1] };
  passwordHash = await bcrypt.hash(userObject.password, 10);
  userObject.passwordHash = passwordHash;
  delete userObject.password;
  userObject = new User(userObject);
  await userObject.save();
});

test("users are returned as json", async () => {
  const response = await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  assert.strictEqual(response.body.length, helper.initialUsers.length);
});

test("username field is empty", async () => {
  const newUser = {
    name: "Alice Johnson",
    password: "password123",
  };
  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.ok(
    response.body.error.includes("User validation failed: username: Path `username` is required.")
  );

  const usersAtEnd = await User.find({});
  assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);
});

test("password field is empty", async () => {
  const newUser = {
    name: "Alice Johnson",
    username:'Alice_888',
  };
  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.ok(
    response.body.error.includes("password is required")
  );

  const usersAtEnd = await User.find({});
  assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);
});
test("username field's length is less than 3 ", async () => {
  const newUser = {
    name: "Alice Johnson",
    username:'Al',
    password:'Hello'
  };
  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.ok(
    response.body.error.includes("User validation failed: username: Path `username` (`Al`, length 2) is shorter than the minimum allowed length (3).")
  );

  const usersAtEnd = await User.find({});
  assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);
});
test("password field's length is less than 3 ", async () => {
  const newUser = {
    name: "Alice Johnson",
    username:'Aliceee',
    password:'He'
  };
  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.ok(
    response.body.error.includes("Password must be at least 3 characters long")
  );

  const usersAtEnd = await User.find({});
  assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);
});
test("username is not unique", async () => {
  const newUser = {
    name: "Alice",
    username:'alice',
    password:'Hello'
  };
  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.ok(
    response.body.error.includes("Username must be unique")
  );

  const usersAtEnd = await User.find({});
  assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);
});
