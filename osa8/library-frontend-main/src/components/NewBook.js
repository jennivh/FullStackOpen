import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, All_BOOKS, CREATE_BOOK, UPDATE_AUTHOR } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [All_BOOKS, ALL_AUTHORS]})

  const [updateAuthor] = useMutation(UPDATE_AUTHOR)

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    createBook({variables: {title, author, published: Number(published), genres}})
    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  const update = (event) => {
    event.preventDefault()
    updateAuthor({ variables: {name, setBornTo: Number(year)}})
    console.log('updated')

    setName('')
    setYear('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
      <h2>Set birthyear</h2>
      <form onSubmit={update}>
        <div>Name<input value={name} onChange={e => setName(e.target.value)}/></div>
        <div>Birth year<input value={year} onChange={e => setYear(e.target.value)}/></div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default NewBook