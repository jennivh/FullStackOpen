import { useLazyQuery, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { BOOKS_BY_GENRE, ME } from "../queries"

const Recommendations = (props) => {
    const [getBooks, results] = useLazyQuery(BOOKS_BY_GENRE)
  
    useEffect(() => {
        getBooks({variables: { genre: props.favoriteGenre }})
    }, [getBooks, props.favoriteGenre])

    if (!props.show) {
        return null;
      }

    if(results.loading){
        return <>loading...</>
    }

    return (
        <>
        <h1>Recommendations</h1>
        <>books in your favourite genre <b>{}</b></>
        <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {results.data?.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </>
    )
}

export default Recommendations