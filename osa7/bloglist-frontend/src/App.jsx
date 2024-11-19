import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import AddBlog from "./components/AddBlog";
import Togglable from "./components/Togglable";
import { useNotificationDispatch } from "./components/NotificationContext";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useNotificationDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      console.log(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch({ type: "SET_NOTIFICATION", data: "wrong username or password" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 2000);
    }
  };

  const logOut = () => {
    console.log("log out");
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const submitNewBlog = async (newBlog) => {
    console.log("lol");
    const sentBlog = await blogService.create(newBlog);
    sentBlog.user = user;
    dispatch({ type: "SET_NOTIFICATION", data: `a new blog ${sentBlog.title} by ${sentBlog.author}` });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 2000);

    console.log(sentBlog);

    setBlogs(blogs.concat(sentBlog));
  };

  const updateBlogs = async (updatedBlog, id) => {
    const updatedLikes = await blogService.update(id, updatedBlog);
    console.log(updatedLikes);
    updatedLikes.user = updatedBlog.user;
    const updatedBlogs = blogs.map((b) =>
      b.id === updatedLikes.id ? updatedLikes : b,
    );
    setBlogs(updatedBlogs);
  };

  const deleteBlog = async (id) => {
    const deletedBlog = await blogService.deleteBlog(id);
    console.log(deletedBlog);
    const newBlogs = blogs.filter((b) => b.id !== id);
    setBlogs(newBlogs);
    console.log(blogs);
    dispatch({ type: "SET_NOTIFICATION", data: `blog ${deletedBlog.title} by ${deletedBlog.author} removed` });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 2000);
  };

  if (user === null) {
    return (
      <div>
        <div>{message}</div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username{" "}
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{" "}
            <input
              type="password"
              name="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <Notification/>
        <h2>blogs</h2>
        <div>
          {user.username} logged in
          <button onClick={logOut}>log out</button>
        </div>
        <Togglable buttonLabel="new blog">
          <AddBlog submitNewBlog={submitNewBlog} />
        </Togglable>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
              updateBlogs={updateBlogs}
              deleteBlog={deleteBlog}
            />
          ))}
      </div>
    );
  }
};

export default App;
