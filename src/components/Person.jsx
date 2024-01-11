const Person = ({ person, handleDeletePerson }) => {
  return (
    <>
      <h3>{person.name} {person.number}</h3>
      <button onClick={() => {
        handleDeletePerson(person.id)
      }
      }>Delete</button>
    </>
  )
}

export default Person