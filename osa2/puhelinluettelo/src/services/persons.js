import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (person) => {
    return axios.post(baseUrl, person)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const change = (changedNumber) => {
    return axios.put(`${baseUrl}/${changedNumber.id}`, changedNumber)
}
export default {getAll, create, deletePerson, change}