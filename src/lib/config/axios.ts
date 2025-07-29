import axios from "axios";
import { env } from "./env";

export const http = axios.create({
  baseURL: env.apiUrl,
  params: {
    key: env.apiKey,
  },
});
