import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://app.nocodb.com/api/v2/",
  headers: {
    "xc-token": "1FaNSlpBJLqtzD3_ZDeL-nUsQttMIVogYnyCfby2",
  },
});