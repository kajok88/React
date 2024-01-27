// import React, { useState } from 'react';

import React, { useState, useEffect } from 'react';
import personService from './services/persons'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Person';
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
        console.log('promise fulfilled')
        setMessage(null)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMessage(
          `Server could not be accessed.`
        );
        setTimeout(() => {
          getAll();
        }, 3000);
      });
      
  }, []);


  const addPerson = (event) => {
    event.preventDefault();
    // Tarkistetaan, ettei nimi tai numero ole tyhjiä
    if (newName.trim() === '' || newNumber.trim() === '') {
      alert('Give a name and a number.');
      return;
    }

    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        // handleUpdate(existing.id);
        personService
          .update(existingPerson.id, {...existingPerson, number: newNumber})
          .then(response => {
            setPersons(persons.map(person => (person.id === existingPerson.id ? response : person)));
            setNewName('');
            setNewNumber('');
            setMessage(
              `${existingPerson.name} was successfully updated`
            );
            setTimeout(() => {
              setMessage(null)
            }, 2500);
          })
          .catch(error => {
            console.error('Error updating person:', error);
            setPersons(persons.filter(person => person.id !== id));
            setNewName('');
            setNewNumber('');
            setMessage(
              `${existingPerson.name} was already deleted from server`
            );
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      // 2.12 -> Lähetetään POST-pyyntö palvelimelle uuden henkilön lisäämiseksi
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons([...persons, returnedPerson]); // Päivitetään myös paikallinen tila
          setNewName('');
          setNewNumber('');
          setMessage(
            `${newName} was successfully added`
          );
          setTimeout(() => {
            setMessage(null)
          }, 2500);
        })
        .catch(error => {
          console.error('Error adding a person:', error);
          setPersons(persons.filter(person => person.id !== returnedPerson));
            setNewName('');
            setNewNumber('');
            setMessage(
              `Server could not be accessed.`
            );
            setTimeout(() => {
              setMessage(null)
            }, 2500);
        });
    };
  };

  const handleUpdate = (id) => {
    const personToUpdate = persons.find(person => person.id === id);
    const name = personToUpdate.name;
    const number = window.prompt(`Update number for ${name}`, personToUpdate.number);

    if (number !== null) {
      personService
        .update(id, {...personToUpdate, number: number})
        .then(response => {
          setPersons(persons.map(person => (person.id === id ? response : person)));
          setMessage(
            `${personToUpdate.name} was successfully updated`
          );
          setTimeout(() => {
            setMessage(null)
          }, 2500);
        })
        .catch(error => {
          console.error('Error updating person:', error);
          setPersons(persons.filter(person => person.id !== id));
          setNewName('');
          setNewNumber('');
          setMessage(
            `Information of ${personToUpdate.name} was already deleted from server`
          );
          setTimeout(() => {
            setMessage(null)
          }, 2500);
        });
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setMessage(
            `${name} was successfully deleted`
          );
          setTimeout(() => {
            setMessage(null)
          }, 2500);
        })
        .catch(error => {
          console.error('Error deleting a person:', error);
        });
    }
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
      <Notification message={message} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons
        persons={filteredPersons}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};





export default App