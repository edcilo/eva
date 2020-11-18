import { Route } from "vue-router";

export default abstract class RouteMiddleware {
  constructor() {
    this.handle = this.handle.bind(this);
  }

  abstract async handle(
    to: Route,
    from: Route,
    next: Function
  ): Promise<Function>;
}
