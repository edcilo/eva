import { AxiosRequestConfig } from "axios";
import { RequestMiddlewareInterface } from "@/data/types";

export default abstract class RequestMiddleware
  implements RequestMiddlewareInterface {
  protected constructor() {
    this.handle = this.handle.bind(this);
  }

  abstract async handle(
    config: AxiosRequestConfig
  ): Promise<AxiosRequestConfig>;
}
