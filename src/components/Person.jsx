const Person = ({ person, handleDeletePerson }) => {
  return (
    <div onClick={() => console.log(person.id)}>
      <h3>{person.name} {person.number}</h3>
      <button style={{ marginBottom: "1em" }} onClick={() => {
        handleDeletePerson(person.id)
      }
      }>Delete</button>
    </div>
  )
}

export default Person