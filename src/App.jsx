// import React, { useState } from 'react';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    Filter shown with: <input value={filter} onChange={handleFilterChange} />
  </div>
);

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ persons }) => (
  <ul>
    {persons.map((person, index) => (
      <li key={index}>
        {person.name} {person.number}
      </li>
    ))}
  </ul>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

// const App = () => {
//   const [persons, setPersons] = useState([
//     { name: 'Arto Hellas', number: '040-123456' },
//     { name: 'Ada Lovelace', number: '39-44-5323523' },
//     { name: 'Dan Abramov', number: '12-43-234345' },
//     { name: 'Mary Poppendieck', number: '39-23-6423122' }
//   ]);
//   const [newName, setNewName] = useState('');
//   const [newNumber, setNewNumber] = useState('');
//   const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/persons')
      .then(response => {
        setPersons(response.data);
        console.log('promise fulfilled')
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 


  const addPerson = (event) => {
    event.preventDefault();


    

    // Tarkistetaan, ettei nimi tai numero ole tyhjiä
    if (newName.trim() === '' || newNumber.trim() === '') {
      alert('Anna nimi ja numero.');
      return;
    }

    // Tarkistetaan, ettei nimi ole jo olemassa
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} löytyy jo puhelinluettelosta.`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    };

    // Lähetetään POST-pyyntö palvelimelle uuden henkilön lisäämiseksi
    axios.post('http://localhost:3000/persons', newPerson)
      .then(response => {
        setPersons([...persons, response.data]); // Päivitetään myös paikallinen tila
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.error('Error adding a person:', error);
      });

      

    // Päivitetään Persons lisäämällä uusi henkilö ja tyjennetään kentät
    setPersons([...persons, newPerson]);
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} />
    </div>
  );
};















export default App
  