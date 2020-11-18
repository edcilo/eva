import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import appState from "./types";
import config from "@/config";

@Module({ namespaced: true, name: "app" })
export default class AppModule extends VuexModule implements appState {
  public version: string = config("app.version");

  public locale: string = config("app.locale");

  public darkMode = false;

  public headerFixed = false;

  public navDashboardExpanded = true;

  @Mutation
  fixHeader(fix = true) {
    this.headerFixed = fix;
  }

  @Mutation
  setLocale(locale: string) {
    this.locale = locale;
  }

  @Mutation
  setDarkmode(darkMode: boolean) {
    this.darkMode = darkMode;
  }

  @Mutation
  toggleNavDashboardExpanded() {
    this.navDashboardExpanded = !this.navDashboardExpanded;
  }

  @Mutation
  closeNavDashboard() {
    this.navDashboardExpanded = false;
  }

  @Mutation
  OpenNavDashboard() {
    this.navDashboardExpanded = true;
  }
}
