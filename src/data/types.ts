export interface RequestMiddlewareConstructor {
  new (...args: any[]): RequestMiddlewareInterface;
}

export interface RequestMiddlewareInterface {
  handle: Function;
}

export interface jsonObject {
  [key: string]: any;
}
