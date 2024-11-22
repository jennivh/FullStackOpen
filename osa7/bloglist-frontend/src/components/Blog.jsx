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
    <div data-testid="blog" className="card" style={{width: "30rem", height:"3rem", margin: "0.5rem"}}>
    <div data-testid="title" className="card-title"><Link to={`/${blog.id}`}>{blog.title} {blog.author}</Link></div> 
    </div>
  );
};


export default Blog;
