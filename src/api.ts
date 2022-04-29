import axios from 'axios'
const development = process.env.NODE_ENV !== 'production'

const api = axios.create({
  baseURL: development
    ? 'http://localhost:3333/'
    : 'https://mylocker-backend.herokuapp.com/',
})

export default api
