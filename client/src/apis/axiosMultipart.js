import axios from "axios";
export const axiosMultipartInstance = axios.create({
  // baseURL:  "http://localhost:4036/freelancers_marketplace_api/",
  baseURL: "http://hybrid.srishticampus.in/freelancers_marketplace_api/",

  headers: {
    "Content-Type": "multipart/form-data",
  },
});

