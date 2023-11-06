import React from 'react';

// const Person = ({ person, handleDelete }) => (
//   <li key={person.id}>
//     {person.name} {person.number}
//     <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
//   </li>
// );
const Persons = ({ persons, handleDelete, handleUpdate }) => {
  return (
    <ul>
      {persons.map((person, index) => (
        <li key={index}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
          <button onClick={() => handleUpdate(person.id)}>Update</button>
        </li>
      ))}
    </ul>
  );
};


export default Persons;