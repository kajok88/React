import axios from 'axios';

const baseUrl = 'http://localhost:3004/api/pins';

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getPinCount = () => {
    const request = axios.get(`${baseUrl}/pinCount`)
    return request.then(response => response.data)
    // Example response: "4 pins saved!"
}

const create = (newPin) => {
    const request = axios.post(baseUrl, newPin)
    return request.then(response => response.data)
}

const update = (id, newPin) => {
    const request = axios.put(`${baseUrl}/${id}`, newPin)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
  };

export default { getAll, getPinCount, create, update, remove }