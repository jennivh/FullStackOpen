import Blog from './Blog';
import AddBlog from './AddBlog';
import Togglable from './Togglable';

const Blogs = ({blogs, submitNewBlog}) => {


    return (
        <>
        
        <h2>blogs</h2>
        <Togglable buttonLabel="new blog">
          <AddBlog submitNewBlog={submitNewBlog} />
        </Togglable>
         {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
            />
          ))}
        </>
    )
}

export default Blogs;