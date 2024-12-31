import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});
instance.interceptors.request.use(
  function (config) {
    if (window.localStorage.getItem("user_id")) {
      config.headers["x-client-id"] = window.localStorage.getItem("user_id");
    }
    if (
      window !== "undefined" &&
      window &&
      window.localStorage &&
      window.localStorage.getItem("access_token")
    ) {
      config.headers.Authorization =
        "Bearer " + window.localStorage.getItem("access_token");
    }
    if (!config.headers.Accept && config.headers["Content-Type"]) {
      config.headers.Accept = "application/json";
      config.headers["Content-Type"] = "application/json; charset=utf-8";
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
    return response.data;
  },
  function (error) {
    return error?.response?.data || Promise.reject(error);
  }
);
export default instance;
