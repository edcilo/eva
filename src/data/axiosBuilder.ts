import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import config from "@/config";

export default class AxiosBuilder {
  static defaultConfig: AxiosRequestConfig = {
    baseURL: config("api.host"),
    timeout: config("api.timeout")
  };

  static build(options: AxiosRequestConfig = {}): AxiosInstance {
    return axios.create({ ...AxiosBuilder.defaultConfig, ...options });
  }
}
