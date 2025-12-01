import axios from "axios";
//if we are in development we can import like import.meta.env.MODE === development

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? "http://localhost:3003/api": "/api",
   withCredentials: true,
   //set the cookies to the backend
});
