import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const addPerson = (personObject) => {
  const request = axios.post(baseUrl, personObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  console.log("HERE");
  return request.then((response) => {
    console.log("THERE", response.data);
    return response.data;
  });
};

export default { addPerson, deletePerson };
