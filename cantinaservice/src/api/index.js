import axios from 'axios';

const api = axios.create({
    baseURL: "http://172.21.2.248:3000"
})

export default api