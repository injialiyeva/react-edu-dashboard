import axios from "axios";

const token = process.env.NOCODB_TOKEN;

export const axiosClient = axios.create({
  baseURL: "https://app.nocodb.com/api/v2/",
  headers: {
    "xc-token": token,
  },
});