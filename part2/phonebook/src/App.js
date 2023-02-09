import { useState, useEffect } from 'react';
// import axios from 'axios';
import phonebookService from './phonebookService';

import Alert from './components/Alert';

const Search = ({ search, handleSearchChange }) => (
  <div>
    filter shown with
    <input value={search} onChange={handleSearchChange} />
  </div>
);

const Form = ({
  newName,
  newNumber,
  handleSubmit,
  setNewName,
  setNewNumber,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name:{' '}
      <input value={newName} onChange={(e) => setNewName(e.target.value)} />
    </div>
    <div>
      number:{' '}
      <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
);

const List = ({ persons, search, removeEntry }) => (
  <ul>
    {search
      ? persons
          .filter((person) =>
            person.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
              {''}
              <button onClick={() => removeEntry(person.id, person.name)}>
                delete
              </button>
            </li>
          ))
      : persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}{' '}
            <button onClick={() => removeEntry(person.id, person.name)}>
              delete
            </button>
          </li>
        ))}
  </ul>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [alertClr, setAlertClr] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const hideAlert = () => {
    setShowAlert(false);
    setAlertClr('');
    setAlertMsg('');
  };

  const alert = (clr, msg) => {
    setAlertClr(clr);
    setAlertMsg(msg);
    setShowAlert(true);

    setTimeout(() => {
      hideAlert();
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let found = false;
    persons.forEach((person) => {
      if (person.name === newName) {
        found = true;
        if (
          window.confirm(
            `${person.name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          phonebookService
            .updatePerson(person.id, {
              ...person,
              number: newNumber,
            })
            .then(() => {
              setPersons(
                persons.map((_person) =>
                  person.id !== _person.id
                    ? _person
                    : { ...person, number: newNumber }
                )
              );
              alert('green', `Updated ${person.name}`);
              setNewName('');
              setNewNumber('');
            })
            .catch((err) => {
              console.log(err);
              if (err.response.status === 500) {
                alert(
                  'red',
                  `Information of ${person.name} has already been removed from server`
                );
                setPersons(
                  persons.filter((_person) => person.name !== _person.name)
                );
                setNewName('');
                setNewNumber('');
              } else {
                alert('red', err.response.data.error);
              }
            });
        }
      }
    });

    if (found) return;
    phonebookService
      .addPerson({
        name: newName,
        number: newNumber,
      })
      .then((res) => {
        console.log(res);
        phonebookService.getPersons().then((data) => {
          setPersons(data);
          alert('green', `Added ${newName}`);
          setNewName('');
          setNewNumber('');
        });
      })
      .catch((err) => {
        const { response } = err;
        alert('red', response.data.error);
      });
  };

  const removeEntry = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      setPersons(persons.filter((person) => person.id !== id));
      alert('red', `Deleted ${name}`);
      phonebookService.removePerson(id).catch((err) => {
        const { response } = err;
        alert('red', response.data.error);
      });
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    phonebookService.getPersons().then((data) => setPersons(data));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      {showAlert && <Alert msg={alertMsg} color={alertClr} />}
      <Search search={search} handleSearchChange={handleSearchChange} />
      <h2>Add a new</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      {persons && (
        <List persons={persons} search={search} removeEntry={removeEntry} />
      )}
    </div>
  );
};

export default App;
