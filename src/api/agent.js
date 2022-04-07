import axios from 'axios';

const baseURL = 'http://localhost:5000/api/v1';
const agent = axios.create({
  baseURL,
  withCredentials: true,
});

export default agent;
