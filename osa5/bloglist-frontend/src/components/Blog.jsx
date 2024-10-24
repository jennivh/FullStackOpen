import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ user, blog, updateBlogs, deleteBlog }) => {
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
    console.log(blog.user.username)
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
    <div data-testid="blog" style={blogStyle}>
      <div data-testid="title">{blog.title}</div>  {blog.author}<button className="view" onClick={ToggleView}>{view ? 'view' : 'hide'}</button>
      {!view && <div>
        <p>{blog.url}</p>
        <div><p data-testid='number'>{blog.likes}</p><button onClick={addLike}>like</button></div>
        {blog.user!==undefined ? <p>{blog.user.username}</p> : ''}
        {user.username===blog.user.username ? <button onClick={removeBlog}>remove</button> : ''}
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