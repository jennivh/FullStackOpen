import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addComment } from "../services/blogs";
import { useState } from "react";


const BlogPage = ({ blogs, updateBlogs, deleteBlog, user  }) => {
  const [comment, setComment] = useState("");
    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)
    const navigate = useNavigate();

    const likeStyle = {
      display: 'flex',
      alignItems: 'center',
    }
  
    const margin = {
      marginLeft: '10px'
    }

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

      const addCommentToBlog = async (e) => {
        e.preventDefault()
        const newComment = await addComment(blog.id, comment);
        setComment("");
        blog.comments = newComment.comments;
      }
    return(
        <>
        <h1>{blog.title} {blog.author}</h1>
          <p>{blog.url}</p>
          <div style={likeStyle}>
            <p data-testid="number">{blog.likes} likes</p>
            <button style={margin} onClick={addLike}>like</button>
          </div>
          {blog.user !== undefined ? <p>added by {blog.user.username}</p> : ""}
          {user.username === blog.user.username ? (
            <button onClick={removeBlog}>remove</button>
          ) : (
            ""
          )}
          <h3>comments</h3>
          <form action="submit">
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/><button onClick={addCommentToBlog}>add comment</button></form>
          {blog.comments !== undefined &&
            blog.comments.length > 0 ? (
              <ul className="list-group list-group-flush">
                {blog.comments.map((comment, index) => (
                  <li key={index} className="list-group-item">{comment}</li>
                ))}
              </ul>
            ) : (
              <p>No comments yet</p>
          )}
        </>
    )
}

export default BlogPage;