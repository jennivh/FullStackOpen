import { Link } from 'react-router-dom'

const Users = ({users}) => {
  
    return(
        <div>
            <h1>Users</h1>
            <table>
                <tr>
                    <td></td>
                    <th>blogs created</th>
                </tr>
                {users.map(user => (
                    <tr key={user.id}>
                        <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                        <td>{user.blogs.length}</td>
                    </tr>
                ))}
            </table>
        </div>

    )
}

export default Users