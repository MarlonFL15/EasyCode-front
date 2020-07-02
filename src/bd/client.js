import axios from 'axios'
export default axios.create({
  baseURL: 'http://localhost:3001', //Base da API
  responseType: 'json',
  responseEncoding: 'utf8',
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  }
});

