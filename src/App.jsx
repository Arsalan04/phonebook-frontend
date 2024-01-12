import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import Person from './components/Person'
import Note from './components/Note'

import noteService from './services/notes'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [persons, setPersons] = useState([])
  const [query, setQuery] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [epicNames, setEpicNames] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

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
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }


  function addPerson(e) {
    e.preventDefault()
    const nameExists = persons.find(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} already exists`)
      return
    }

    const personObject = { name: newName, number: newNumber }

    personService.addPerson(personObject)
      .then(newPersons => {
        setPersons([...newPersons])
        setSuccessMessage(`${personObject.name} with number ${personObject.number} added!`)
        setTimeout(() => { setSuccessMessage(null) }, 2000)
      })
    setNewName('')
    setNewNumber('')
  }

  function deletePerson(id) {
    const person = persons.find(p => p.id === id)
    personService.deletePerson(person.id)
      .then((res) => setPersons(res))
  }

  useEffect(() => {
    // noteService.getAll().then(initialNotes => setNotes(initialNotes))

    personService.getPersons().then(people => setPersons(people))

  }, [])


  return (
    <div className='container'>
      {/* <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type='submit'>Add Note</button>
      </form> */}


      {/* <h2>Phonebook</h2> */}
      {/* <h2 style={{ marginTop: "1em" }}>Add New</h2> */}
      <Notification message={successMessage} />
      <AddForm
        handleAdd={addPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber} />

      {/* <h2>Numbers</h2> */}
      <Filter value={query} onChange={handleQueryChange} />
      <div className='persons-grid'>
        {
          !query
            ?
            persons.map(person => (
              <Person person={person} key={person.id} handleDeletePerson={deletePerson} />
            ))
            :
            epicNames.map(person => (
              <Person person={person} key={person.id} handleDeletePerson={deletePerson} />
            ))
        }
      </div>

    </div>
  )
}

export default App