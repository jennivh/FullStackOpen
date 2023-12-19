import { useLazyQuery, useQuery } from "@apollo/client";
import { All_BOOKS, BOOKS_BY_GENRE } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const results = useQuery(All_BOOKS);
  const [genre, setGenre] = useState("all");
  const [getGenreBooks, { data, loading}] =
    useLazyQuery(BOOKS_BY_GENRE);
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([])

  useEffect(() => {
     if(results.data){
      setBooks(results.data.allBooks)
      setAllBooks(results.data.allBooks)
     }
  },[results.data])

  useEffect(() => {
    getGenreBooks({ variables: { genre } });
    if(data){
      setBooks(data.allBooks)
    }
    if(genre === "all"){
      setBooks(allBooks)
    }
  },[allBooks, books, data, genre, getGenreBooks])

  if (!props.show) {
    return null;
  }

  if ( results.loading || !books || loading) {
    console.log(books)
    return <div>loading...</div>;
  }
  const genreArray = results.data.allBooks
  .map((b) => b.genres)
  .flat()
  .concat("all");
  const genres = [...new Set(genreArray)];

  const handleClick = (genre) => {
    setGenre(genre);
  };



  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genre</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button onClick={() => handleClick(g)}>{g}</button>
      ))}
    </div>
  );
};

export default Books;
