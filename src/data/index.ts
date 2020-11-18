import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { jsonObject } from "@/data/types";
import AxiosBuilder from "./axiosBuilder";

export default class HttpClient {
  protected http: AxiosInstance;

  constructor(config: AxiosRequestConfig = {}) {
    this.http = AxiosBuilder.build(config);
  }

  public get(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse | never> {
    return this.http
      .get(url, config)
      .then((response: AxiosResponse) => Promise.resolve(response.data))
      .catch((error: any) => Promise.reject(error.response));
  }

  public post(
    url: string,
    data: jsonObject = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse | never> {
    return this.http
      .post(url, data, config)
      .then((response: AxiosResponse) => Promise.resolve(response.data))
      .catch((error: any) => Promise.reject(error.response));
  }

  public put(
    url: string,
    data: jsonObject = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse | never> {
    return this.http
      .put(url, data, config)
      .then((response: AxiosResponse) => Promise.resolve(response.data))
      .catch((error: any) => Promise.reject(error.response));
  }

  public patch(
    url: string,
    data: jsonObject = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse | never> {
    return this.http
      .patch(url, data, config)
      .then((response: AxiosResponse) => Promise.resolve(response.data))
      .catch((error: any) => Promise.reject(error.response));
  }

  public delete(
    url: string,
    conf: AxiosRequestConfig = {}
  ): Promise<AxiosResponse | never> {
    return this.http
      .delete(url, conf)
      .then((response: AxiosResponse) => Promise.resolve(response.data))
      .catch((error: any) => Promise.reject(error.response));
  }

  public head(
    url: string,
    conf: AxiosRequestConfig = {}
  ): Promise<AxiosResponse | never> {
    return this.http
      .head(url, conf)
      .then((response: AxiosResponse) => Promise.resolve(response.data))
      .catch((error: any) => Promise.reject(error.response));
  }

  public interceptorRequest(handle: any) {
    this.http.interceptors.request.use(handle);
  }

  public interceptorResponse(handle: any) {
    this.http.interceptors.response.use(handle);
  }
}
