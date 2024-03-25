/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import personService from "./services/persons";
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState({color: 'green'})

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const names = persons.map((p) => p.name);
    if (names.includes(newName)) {
      if (
        window.confirm(
          `${newName} has already been added to phonebook, do you want to change the old number to the new number?`
        )
      ) {
        const personToChange = persons.find((p) => p.name === newName);
        const changedPerson = { ...personToChange, number: newNumber };
        personService.change(changedPerson).then((response) => {
          setPersons(
            persons.map((p) =>
              p.id === personToChange.id ? response.data : p
            )
          );
          setColor({color: 'green'})
          setMessage(`changed number for ${response.data.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName("");
          setNewNumber("");
        }).catch( error => {
          console.log(error)
          setColor({color: 'red'})
          setMessage(`Information of ${changedPerson.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        });
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then((response) => {
          setPersons(persons.concat(response.data));
          setColor({color: 'green'})
          setMessage(`added ${response.data.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName("");
          setNewNumber("");
        })
        .catch(error => {
          console.log("error",error)
          console.log("error.response",error.response)
          setColor({color: 'red'})
          setMessage(`${error.response.data.error}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        });
    }
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService.deletePerson(person.id).then( response => {
        setColor({color: 'green'})
        setMessage(`deleted ${response.data.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      });
      const people = persons.filter((p) => (p.id !== person.id ? p : ""));
      setPersons(people);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={color}/>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        addName={addName}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error" style={color}>
      {message}
    </div>
  )
}

const PersonForm = ({
  addName,
  setNewName,
  setNewNumber,
  newName,
  newNumber,
}) => {
  return (
    <>
      <form onSubmit={addName}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Persons = ({ persons, filter, handleDelete }) => {
  return (
    <>
      <div>
        {persons
          .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
          .map((p) => {
            return (
              <div key={p.id}>
                {p.name} {p.number}{" "}
                <button onClick={() => handleDelete(p)}>delete</button>
              </div>
            );
          })}
      </div>
    </>
  );
};

const Filter = ({ filter, setFilter }) => {
  return (
    <>
      <div>
        filter shown with{" "}
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
    </>
  );
};
export default App;
