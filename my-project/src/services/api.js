import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api"
  baseURL:"https://mini-project-ml.onrender.com/api"
});

export default API;