import { gql } from '@apollo/client'

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
    author
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
        author,
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