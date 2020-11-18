import { AxiosRequestConfig } from "axios";
import Middleware from "./middleware";

export default class AuthorizationMiddleware extends Middleware {
  public async handle(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    config.headers.Authorization = "edc1234567890";
    return config;
  }
}
