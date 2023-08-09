import axios, { AxiosInstance } from "axios";

import { SERVER_BASE_URL } from "./baseUrl";

export default class Api {
  public httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: SERVER_BASE_URL,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
}
