import {useState, useEffect} from 'react'
import {useMutation} from '@apollo/client'
import { LOGIN } from '../queries'

const Login = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [login, result] = useMutation(LOGIN)

    useEffect(() => {
        if(result.data){
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('user-token', token)
        }
    }, [result.data])

    const submit = async (event) => {
        event.preventDefault()

        login({variables: {username, password}})
        setUsername('')
        setPassword('')
        props.setPage('books')
    }

    if (!props.show) {
        return null
        }

    return (
        <>
        <h2>Login</h2>
        <form onSubmit={submit}>
            <div>username<input type='text' value={username} onChange={e => setUsername(e.target.value)}></input></div>
            <div>password<input type='password' value={password} onChange={ e => setPassword(e.target.value)}></input></div>
            <button type='submit'>login</button>
        </form>
        </>
    )
}

export default Login