import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import Person from './components/Person'
import Note from './components/Note'

import noteService from './services/notes'
import personService from './services/persons'

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [persons, setPersons] = useState([])
  const [query, setQuery] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [epicNames, setEpicNames] = useState([])

  function handleQueryChange(e) {
    const updatedQuery = e.target.value;
    setQuery(updatedQuery);
    setEpicNames(persons.filter((person) => person.name.toLowerCase().includes(updatedQuery.toLowerCase())))
  }

  function addNote(event) {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService.createNote(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.updateNote(id, changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }


  // function addPerson(e) {
  //   e.preventDefault()
  //   const nameExists = persons.find(person => person.name === newName)
  //   if (nameExists) {
  //     alert(`${newName} already exists`)
  //     return
  //   }

  //   const personObject = {
  //     name: newName,
  //     number: newNumber
  //   }

  //   personService.addPerson(personObject)
  //     .then((newPerson) => setPersons([...persons, newPerson]))

  //   setNewName('')
  //   setNewNumber('')
  // }

  // function deletePerson(id) {
  //   const person = persons.find(p => p.id === id)
  //   personService.deletePerson(person.id)
  //     .then((res) => console.log(res))
  // }

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes))

    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))

  }, [])


  return (
    <div>

      {/* <h2>Numbers</h2> */}
      {/* {
        !query
          ?
          persons.map(person => (
            <Person person={person} key={person.id} handleDeletePerson={deletePerson} />
          ))
          :
          epicNames.map(person => (
            <Person person={person} key={person.id} handleDeletePerson={deletePerson} />
          ))
      } */}

      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type='submit'>Add Note</button>
      </form>


      {/* <h2>Phonebook</h2> */}

      {/* <Filter value={query} onChange={handleQueryChange} /> */}

      {/* <h2>Add New</h2> */}

      {/* <AddForm
        handleAdd={addPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber} /> */}


    </div>
  )
}

export default App