import { useState } from "react"

const Blog = ({ blog, updateBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [view, setView] =useState(true)
  
  const ToggleView = () => {
    console.log(blog)
    setView(!view)
  }

  const addLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes +1
    }
    updateBlogs(updatedBlog, blog.id)
  }


  return(
  <div style={blogStyle}>
    {blog.title}  {blog.author}<button onClick={ToggleView}>{view ? 'view' : 'hide'}</button>
    {!view && <div>
      <p>{blog.url}</p>
      <div><p>{blog.likes}</p><button onClick={addLike}>like</button></div>
    <p>{blog.user.username}</p>
    </div>}
  </div>  
)
}

export default Blog