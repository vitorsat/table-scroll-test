import axios from "axios";

export const api = axios.create({
  baseURL: "https://placom-mock-production.up.railway.app/",
});
