import axios from "axios";
import URL from "./URL";

export default axios.create({
  baseURL: `${URL}/api`,
  responseType: "json",
  withCredentials: true,
});
