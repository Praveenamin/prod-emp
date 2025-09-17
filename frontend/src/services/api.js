import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3338", 
  // If accessing from outside the server, replace with:
  // baseURL: "http://23.82.14.235:3338"
});

export default api;

