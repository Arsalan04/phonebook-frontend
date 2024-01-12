const Notification = ({ message }) => {
  if (message === null) {
    return <h1 style={{ marginTop: "1em", }}>Add New</h1>
  }

  return (
    <div className="success" style={{ marginTop: "1em", }}>
      {message}
    </div>
  );
}

export default Notification;
