import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, updateBlogs, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [view, setView] = useState(true)

  const ToggleView = () => {
    console.log(blog)
    setView(!view)
  }

  const addLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlogs(updatedBlog, blog.id)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      deleteBlog(blog.id)
    console.log('lol')
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title}</div>  {blog.author}<button className="view" onClick={ToggleView}>{view ? 'view' : 'hide'}</button>
      {!view && <div>
        <p>{blog.url}</p>
        <div><p>{blog.likes}</p><button onClick={addLike}>like</button></div>
        <p>{blog.user.username}</p>
        <button onClick={removeBlog}>remove</button>
      </div>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlogs: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog