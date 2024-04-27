import axios from "axios";
export const axiosMultipartInstance = axios.create({
  baseURL:  "http://localhost:4011/freelancers_api/",

  headers: {
    "Content-Type": "multipart/form-data",
  },
});

