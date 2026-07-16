import axios from "axios";

const API = axios.create({
  baseURL: "https://travelwise-jbz7.onrender.com/api",
  timeout: 30000,
});

export default API;
