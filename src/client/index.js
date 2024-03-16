import axios from 'axios';

const client = axios.create({
  baseURL: location.origin + "/api",
  timeout: 60*1000
})

export default client