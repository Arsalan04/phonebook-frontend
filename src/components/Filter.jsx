const Filter = (props) => {
  return (
    <div style={{ marginBottom: "1em" }}>
      Filter By Name: <input {...props} type="text" />
    </div>
  )
}

export default Filter