import axios from 'axios';


// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL || "http://localhost:9897"}`, // Set your backend URL here
});

export default api;
