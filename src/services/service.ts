import http from "@/data";
import {
  RequestMiddlewareConstructor,
  RequestMiddlewareInterface
} from "@/data/types";

export default abstract class Service {
  public client: http;

  public abstract middlewares: {
    [name: string]: RequestMiddlewareInterface;
  };

  public static defaultMiddleware = {};

  protected constructor() {
    if (this.constructor.name === Service.name) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }

    this.client = Service.buildHttpClient();
  }

  static buildHttpClient(): http {
    return new http();
  }

  protected getMiddleware(): Array<RequestMiddlewareConstructor> {
    return Object.values({
      ...Service.defaultMiddleware,
      ...this.middlewares
    });
  }

  protected applyMiddleware() {
    this.getMiddleware().map((middleware: RequestMiddlewareConstructor) => {
      this.client.interceptorRequest(new middleware().handle);
    });
  }
}
