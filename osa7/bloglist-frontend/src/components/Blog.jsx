import { Link } from "react-router-dom";

const Blog = ({ blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
 
  

  return (
    <div data-testid="blog" style={blogStyle}>
    <Link to={`/${blog.id}`} ><div data-testid="title">{blog.title} {blog.author}</div> </Link>
    </div>
  );
};


export default Blog;
