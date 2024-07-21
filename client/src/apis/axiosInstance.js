import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://hybrid.srishticampus.in/freelancers_marketplace_api/",
    // baseURL: "http://localhost:4036/freelancers_marketplace_api/",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
