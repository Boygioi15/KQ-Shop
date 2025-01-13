import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});
instance.interceptors.request.use(
  function (config) {
    // Get token from localStorage
    const token = localStorage.getItem("access_token");
    
    // Add Authorization header if token exists
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    
    // Add user_id if exists
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      config.headers["x-user-id"] = user_id;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    return error?.response?.data || Promise.reject(error);
  }
);
export default instance;
