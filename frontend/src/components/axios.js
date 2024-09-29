import axios from 'axios';

const backend_port = 9897

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: `http://localhost:${backend_port}`, // Set your backend URL here
});

export default api;
