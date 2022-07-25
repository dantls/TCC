import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api-flash-services.herokuapp.com/src/Routes/',
});

export default api;