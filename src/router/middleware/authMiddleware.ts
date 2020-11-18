import { Route } from "vue-router";
import RouteMiddleware from "./middleware";

export default class AuthMiddleware extends RouteMiddleware {
  async handle(to: Route, from: Route, next: Function) {
    return next();
  }
}
