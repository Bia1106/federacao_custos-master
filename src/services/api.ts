import axios from 'axios';

const api = axios.create({
  baseURL: 'http://45.35.104.231:8081/api_prd',
});

export { api };
