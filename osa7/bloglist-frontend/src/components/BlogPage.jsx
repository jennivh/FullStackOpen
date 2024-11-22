import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BlogPage = ({ blogs, updateBlogs, deleteBlog, user  }) => {
    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)
    const navigate = useNavigate();
    
    const addLike = () => {
        updateBlogs(blog);
      };
    
      const removeBlog = () => {
        console.log("blog to delete", blog);
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
          deleteBlog(blog.id);
        }     
        console.log("lol");
        navigate("/");
      };

    return(
        <>
        <h1>{blog.title} {blog.author}</h1>
          <p>{blog.url}</p>
          <div>
            <div><p data-testid="number">{blog.likes} likes</p></div>
            <div><button onClick={addLike}>like</button></div>
          </div>
          {blog.user !== undefined ? <p>added by {blog.user.username}</p> : ""}
          {user.username === blog.user.username ? (
            <button onClick={removeBlog}>remove</button>
          ) : (
            ""
          )}
        </>
    )
}

export default BlogPage;