import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login"
import AddBlog from "./components/AddBlog";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
  };


  const logOut = () => {
    console.log("log out")
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
  }

  const submitNewBlog = async (e) => {
    e.preventDefault()
    console.log('lol')
    const newBlog = { title, author, url }
    
      const sentBlog = await blogService.create(newBlog)
    setMessage(`a new blog ${sentBlog.title} by ${sentBlog.author}`)
    setTimeout(() => {
      setMessage(null)
    }, 2000)

    console.log(sentBlog)
    
    
  }

  if (user === null) {
    return (
      <div>
        <div>{message}</div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username <input
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
          <button type='submit'>login</button>
        </form>
      </div>
    );
  }

  else {
    return (
      <div>
        <div>{message}</div>
        <h2>blogs</h2>
        <div>{user.username} logged in
          <button onClick={logOut}>log out</button>
        </div>
        <Togglable buttonLabel="new blog">
        <AddBlog submitNewBlog={submitNewBlog} title={title} setTitle={setTitle} setAuthor={setAuthor} author={author} url={url} setUrl={setUrl}/>
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
