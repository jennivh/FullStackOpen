import { UPDATE_AUTHOR, ALL_AUTHORS } from "../queries";
import { useState } from "react";
import { useMutation } from "@apollo/client";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ALL_AUTHORS],
  });

  const update = async (event) => {
    event.preventDefault();
    updateAuthor({ variables: { name, setBornTo: Number(year) } });
    console.log("updated");

    setName("");
    setYear("");
  };

  if (!props.show) {
    return null;
  }
  const authors = props.authors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={update}>
       <div>Name<select onClick={(e) => setName(e.target.value)}>
          {authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select></div>
        <div>
          Birth year
          <input value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
