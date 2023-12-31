import axios from "axios";
// const baseUrl = "http://localhost:3001/persons";
const baseUrl = "/api/persons";

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const addPerson = (newPerson) => {
  const req = axios.post(baseUrl, newPerson);
  return req.then((res) => res.data);
};

const deletePerson = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => res.data);
};

const updateNumber = (id, changedData) => {
  const req = axios.put(`${baseUrl}/${id}`, changedData);
  return req.then((res) => res.data);
};
export default { getAll, addPerson, deletePerson, updateNumber };
