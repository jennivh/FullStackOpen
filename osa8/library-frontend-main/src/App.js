import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import {useLazyQuery, useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ME } from './queries'
import Recommendations from './components/Recommendations'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const [getUser, user] = useLazyQuery(ME);
  const result = useQuery(ALL_AUTHORS)
  
   const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }
  
  if(result.loading){
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { !token ? <LoggedOut setPage={setPage}/> : <LoggedIn setPage={setPage} logout={logout}/>}
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} />

      <Books show={page === 'books'}/>

      <NewBook show={page === 'add'} />

      <Recommendations show = {page === 'recommendations'}  favoriteGenre={user?.data?.me?.favoriteGenre}/>

      <Login show={page === 'login'}  setToken={setToken} setPage={setPage} getUser={getUser}/>

    </div>
  )
}

export default App


const LoggedOut = (props) => {
  return (
      <>
            <button onClick={() => props.setPage('login')}>login</button>
     </>
  )
}

const LoggedIn = (props) => {
  return (
     <>
            <button onClick={() => props.setPage('add')}>add book</button>
            <button onClick={() => props.setPage('recommendations')}>recommendations</button>
            <button onClick={props.logout}>logout</button>
     </>
  )
}