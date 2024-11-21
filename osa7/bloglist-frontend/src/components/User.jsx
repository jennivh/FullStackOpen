import { useParams } from "react-router-dom"

const User = ({users}) => {
    const userId = useParams().id
    const user = users.find(user => user.id === userId)
    if(!user) {
        return <>Loading</>
    }
    return(
        <>
        <h1>{user.username}</h1>
        <h2>added blogs</h2>
        <ul>{user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
        ))}</ul>
        </>
    )
}

export default User