import axios from 'axios';

const getPersons = () =>
  axios('http://localhost:3001/persons').then((res) => res.data);

const addPerson = (person) =>
  axios.post('http://localhost:3001/persons', person);

const removePerson = (id) =>
  axios.delete(`http://localhost:3001/persons/${id}`);

const updatePerson = (id, newPerson) =>
  axios.put(`http://localhost:3001/persons/${id}`, newPerson);

export default { getPersons, addPerson, removePerson, updatePerson };
