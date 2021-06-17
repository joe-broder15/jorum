import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://forum-joe-broder.herokuapp.com/api",
  timeout: 10000,
  headers: {
    Authorization: "JWT " + localStorage.getItem("access_token"),
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
export default axiosInstance;
