const AddBlog = ({submitNewBlog, title, setTitle, author, setAuthor, url, setUrl}) => {

    return( 
    <div>
        <h2>create new</h2>
        <form onSubmit={submitNewBlog}>
          <div><label>title:</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div><label>author:</label><input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} /></div>
          <div><label>url:</label><input type="text" value={url} onChange={(e) => setUrl(e.target.value)} /></div>
          <button type='submit'>create</button>
        </form>
      </div>)
}

export default AddBlog