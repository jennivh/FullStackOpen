const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");
const user = require("../models/user");
const blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    console.log("delete blog: server", request.params.id);
    const user = request.user;
    if (user.blogs.includes(request.params.id)) {
      await Blog.findByIdAndDelete(request.params.id);
      user.blogs = user.blogs.filter((b) => b.id !== request.params.id);
      await user.save();
      console.log("it worked!")
      response.status(204).end();
    } else {
      response.status(403).json({ error: "wrong user or invalid id" });
    }
  },
);

blogsRouter.put("/:id", async (request, response) => {
  console.log("blog to update",request.body);
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });
  response.json(newBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body;
  
  const blog = await Blog.findById(request.params.id);
  if(blog.comments === undefined){
    blog.comments = [];
  }
  blog.comments = blog.comments.concat(body.comment);
  const result = await blog.save();
  response.status(201).json(result);
})

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  if (body.title === undefined || body.author === undefined) {
    response.status(400).json({ error: "author or title missing" });
  } else {
    response.status(201).json(result);
  }
});

module.exports = blogsRouter;
