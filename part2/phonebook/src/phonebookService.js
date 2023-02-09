import axios from 'axios';

const baseUrl = 'api/persons';

const getPersons = () => axios.get(baseUrl).then((res) => res.data);

const addPerson = (person) => axios.post(baseUrl, person);

const removePerson = (id) => axios.delete(`${baseUrl}/${id}`);

const updatePerson = (id, newPerson) =>
  axios.put(`${baseUrl}/${id}`, newPerson);

const exportObject = {
  getPersons,
  addPerson,
  removePerson,
  updatePerson,
};

export default exportObject;
