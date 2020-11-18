import Service from "./service";
import { CredentialsInterface } from "./types";

export default class AuthService extends Service {
  public middlewares = {};

  constructor() {
    super();

    this.applyMiddleware();
  }

  authenticate(credentials: CredentialsInterface) {
    return this.client.post("/oauth/token", credentials);
  }

  refreshToken(refreshToken: string) {
    return this.client.post("/auth/token/refresh", {
      refresh_token: refreshToken
    });
  }
}
