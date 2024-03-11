import axios from 'axios';

export const client = axios.create({
  baseURL: location.origin + "/api/v1",
  timeout: 60*1000
})