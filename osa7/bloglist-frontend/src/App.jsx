import { useState, useEffect, useReducer } from "react";
import Blog from "./components/Blog";
import { getAll, setToken, create, update, deleteBlog } from "./services/blogs";
import loginService from "./services/login";
import AddBlog from "./components/AddBlog";
import Togglable from "./components/Togglable";
import { useNotificationDispatch } from "./components/NotificationContext";
import Notification from "./components/Notification";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import UserContext from "./UserContext";

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
}

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, userDispatch] = useReducer(userReducer, null);
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "SET", payload: user });
      setToken(user.token);
    }
  }, []);

  const result = useQuery(
    {
      queryKey: ['blogs'],
      queryFn: getAll,
      refetchOnWindowFocus: false
    }
  )

  const newBlogMutation = useMutation({
    mutationFn: create,
    onSuccess: (newBlog) => {
      newBlog.user = user
      const blogs = queryClient.getQueryData(['blogs'])
      if (blogs) {
        queryClient.setQueryData(['blogs'], [...blogs, newBlog])
        dispatch({ type: "SET_NOTIFICATION", data: `a new blog ${sentBlog.title} by ${sentBlog.author}` });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 2000);
      } else {
        queryClient.invalidateQueries(['blogs'])
      }},
    onError: (error) => {
      dispatch({ type: 'SET_NOTIFICATION', data: error.response.data.error })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })  
          }, 5000)
        }
      }
  )

  const updateVotesMutation = useMutation({
    mutationFn: update,
    onSuccess: (data, variables) => {
      data.user = variables.user
      const blogs = queryClient.getQueryData(['blogs'])
      if(blogs){
        const updatedBlogs = blogs.map(blog =>
          blog.id === data.id ? data : blog
        )
        queryClient.setQueryData(['blogs'], updatedBlogs)
      }
      else {
        queryClient.invalidateQueries(['blogs'])
      }
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => deleteBlog(id),
    onSuccess: (data,variables) => {
      const blogs = queryClient.getQueryData(['blogs'])
      if (blogs) {
        const newBlogs = blogs.filter(blog => blog.id !== variables)
        queryClient.setQueryData(['blogs'], newBlogs)
      } else {
        queryClient.invalidateQueries(['blogs'])
      }
    },
    onError: (error) => {
      dispatch({ type: 'SET_NOTIFICATION', data: error.response.data.error })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })  
      }, 5000)
    }
  })

  const blogs = result.data;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setToken(user.token);
      userDispatch({ type: "SET", payload: user });
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
    userDispatch({ type: "LOGOUT" });
  };

  const submitNewBlog = (newBlog) => {
    console.log("lol");
    newBlogMutation.mutate(newBlog);
    
  };

  const updateBlogs = (updatedBlog) => {
    console.log(updatedBlog);
    const blogToSend = {...updatedBlog, likes: updatedBlog.likes + 1};
    updateVotesMutation.mutate(blogToSend);
  };

  const deleteBlogFromBlogs = (id) => {
    console.log("delete blog", id);
    deleteBlogMutation.mutate(id);
  };

 

  if (result.isError) {
    return <div>blog service not available due to problems in server</div>
  }

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (user === null) {
    return (
      <div>
        <Notification/>
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
      <UserContext.Provider value={[user, userDispatch]}> 
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
              deleteBlog={deleteBlogFromBlogs}
            />
          ))}
      </div>
      </UserContext.Provider>
    );
  }
};

export default App;
