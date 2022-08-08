import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    headers: {'Accept': 'application/json'}
})
api.defaults.headers['Accept'] = 'application/json'
api.defaults.headers['Content-Type'] = 'application/json'
api.defaults.headers.common['Authorization'] = `bearer ${localStorage.getItem('token')}`


export default api