import { gql } from '@apollo/client'

export const ME = gql`
query {
  me {
    username,
    favoriteGenre
  }
}
`

export const ALL_AUTHORS = gql`
query{
  allAuthors {
    name,
    born,
    bookCount
  }
}
`
export const All_BOOKS = gql`
query {
  allBooks {
    title,
    published,
    author{
      name
    },
    genres
  }
}
`
export const BOOKS_BY_GENRE = gql`
query allBooks($genre: String){
  allBooks(genre: $genre) {
    title,
    published,
    author{
      name
    },
    genres
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook ($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres) {
        title,
        author{
          name
        }
        published,
        genres
    }
  }
`
export const UPDATE_AUTHOR = gql`
  mutation updateAuthor ($name: String!, $setBornTo: Int!){
    editAuthor(
        name: $name,
        setBornTo: $setBornTo
    ){
        name,
        born
    }
  }
`