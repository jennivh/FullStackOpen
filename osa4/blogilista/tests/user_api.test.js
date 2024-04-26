const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");

const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const User = require("../models/user");

const api = supertest(app);

initialUsers = [{ username: "root", password: "password" }];

beforeEach(async () => {
  await User.deleteMany({});

  await User.insertMany(initialUsers);
});

test("user is found", async () => {
  const users = await api.get("/api/users").expect(200);
  assert.strictEqual(users.body.length, 1);
});

test("new user can be created", async () => {
  const usersInDB = await api.get("/api/users");

  const newUser = {
    username: "moi",
    password: "parasSalasana",
    name: "Janne",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersNow = await api.get("/api/users");
  console.log("users in db", usersInDB.body);
  console.log("usersNow", usersNow.body);
  assert.strictEqual(usersNow.body.length, initialUsers.length + 1);

  const usernames = usersNow.body.map((u) => u.username);
  assert(usernames.includes(newUser.username));
});

test("creation fails with proper statuscode and message if username already taken", async () => {
  

  const newUser = {
    username: "root",
    name: "Superuser",
    password: "salainen",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDB();
  assert(result.body.error.includes("expected `username` to be unique"));

  assert.strictEqual(usersAtEnd.length, initialUsers.length);
});

test("test too short username", async () => {
  const newUser = {
    username: "ro",
    password: "liianLyhyt",
    name: "uusi käyttäjä",
  };

  await api.post("/api/users").send(newUser).expect(400);
  const usersAfter = await helper.usersInDB();
  assert.strictEqual(usersAfter.length, initialUsers.length);
});

test("test too short password", async () => {
  
  const newUser = {
    username: "rooo",
    password: "li",
    name: "uusi käyttäjä",
  };

  await api.post("/api/users").send(newUser).expect(400);
  const usersAfter = await helper.usersInDB();
  assert.strictEqual(usersAfter.length, initialUsers.length);
});

after(async () => {
  console.log("moiiiiii täällä ollaan");
  await mongoose.connection.close();
});
