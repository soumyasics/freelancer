import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:4011/freelancers_api/",
    headers: {
      "Content-Type": "application/json",
    },
  });

