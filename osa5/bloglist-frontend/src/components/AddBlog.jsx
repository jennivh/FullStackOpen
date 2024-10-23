import PropTypes from 'prop-types'
import { useState } from 'react'

const AddBlog = ({ submitNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = { title, author, url }
    submitNewBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div><label>title:</label><input data-testid='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
        <div><label>author:</label><input data-testid='author' type="text" value={author} onChange={(e) => setAuthor(e.target.value)} /></div>
        <div><label>url:</label><input data-testid='url' type="text" value={url} onChange={(e) => setUrl(e.target.value)} /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

AddBlog.propTypes = {
  submitNewBlog: PropTypes.func.isRequired
}

export default AddBlog