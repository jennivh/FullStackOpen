const { test, after, beforeEach, describe, afterEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");

const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helper = require('./test_helper')
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

const initialBlogs = [
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  },
];

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Blog.insertMany(initialBlogs)
  const password = await bcrypt.hash('password', 10)
  const user = new User({
      username: 'admin',
      name: 'adminko',
      blogs: [],
      password
})

await user.save()
const userForToken = {
  username: user.username,
  id: user.id
}
 token = jwt.sign(userForToken, process.env.SECRET)
})

test('right number of blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length,initialBlogs.length)
});

test("correct content-type", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("correct amount of blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("id, not _id", async () => {
  const response = await api.get("/api/blogs");
  const blog = response.body[0];
  assert.strictEqual(blog.hasOwnProperty("id"), true);
  assert.strictEqual(blog.hasOwnProperty("_id"), false);
});

test("one blog can be added", async () => {
  const newBlog = {
    title: "War of Wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2015/05/01/WarOfWars.html",
    likes: 2,
  };
  console.log(token)
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await api.get("/api/blogs");
  const titles = blogs.body.map((b) => b.title);
  assert.strictEqual(blogs.body.length, initialBlogs.length + 1);
  assert(titles.includes("War of Wars"));
});

test("no likes to zero likes", async () => {
  const newBlog = {
    title: "War of Wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2015/05/01/WarOfWars.html",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog);

  const response = await api.get("/api/blogs");
  const blogs = response.body;
  assert.strictEqual(blogs[blogs.length - 1].likes, 0);
});

test("no author", async () => {
  const newBlog = {
    title: "War of Wars",
    url: "http://blog.cleancoder.com/uncle-bob/2015/05/01/WarOfWars.html",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);
});

test("no title", async () => {
  const newBlog = {
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2015/05/01/WarOfWars.html",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);
});


  test("deleted one is deleted", async () => {
    const newBlog = {
      author: 'Mina Olen',
      title:'Best blog ever',
      url:'skjfodvho.fi'
    }

    const blog = await api.post('/api/blogs').set("Authorization", `Bearer ${token}`).send(newBlog)
    const all = await helper.blogsInDb()
    console.log('blog', blog)
    console.log("all'",all)
    assert.strictEqual(all.length, initialBlogs.length+1)
    await api
      .delete(`/api/blogs/${blog.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAgain = await api.get("/api/blogs");
    console.log('blogsAgain', blogsAgain)
    assert.strictEqual(blogsAgain.body.length, initialBlogs.length);
  });

  test("wrong id", async () => {
    const id = "ydsgyd7gy9sd8gsd";
    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(403);
  });


describe("updating blogs", async () => {
  test("likes increase", async () => {
    const blogs = await api.get("/api/blogs");
    const blog = blogs.body[0];
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    await api.put(`/api/blogs/${blog.id}`).send(newBlog).expect(200);

    const blogsAgain = await api.get("/api/blogs");
    const blogAgain = blogsAgain.body[0];

    assert.strictEqual(blogAgain.likes, blog.likes + 1);
  });
});


after(async () => {
  console.log("moiiiiii täällä ollaan");
  await mongoose.connection.close();
});
