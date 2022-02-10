import axios from 'axios';
import constants from '../utils/constant';

const baseURL = 'http://localhost:5000/api/v1';
const agent = axios.create({
  baseURL,
});

agent.interceptors.request.use(
  config => {
    // Check token in local storage
    const token = localStorage.getItem(constants.TOKEN_KEY);
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  err => Promise.reject(err)
);

export default agent;
