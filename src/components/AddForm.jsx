
const AddForm = ({ handleAdd, newName, newNumber, setNewName, setNewNumber }) => {
  return (
    <form onSubmit={handleAdd}>
      <div style={{ display: "flex", gap: "1em", marginBlockStart: "0.5em", alignItems: "stretch" }}>
        <div className="form-control">Name: <input value={newName} onChange={e => setNewName(e.target.value)} /></div>
        <div className="form-control">Number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} /></div>
        <div className="form-control">
          <button type="submit">Add Person</button>
        </div>
      </div>
    </form>)
}

export default AddForm