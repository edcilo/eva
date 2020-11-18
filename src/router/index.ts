import Vue from "vue";
import VueRouter from "vue-router";
import Meta from "vue-meta";
import config from "@/config";
import Middleware from "@/router/middleware/middleware";
import AuthMiddleware from '@/router/middleware/authMiddleware';

import Landing from "./landing";
import Components from "./components";
import Layouts from "./layouts";

Vue.use(VueRouter);
Vue.use(Meta);

const router = new VueRouter({
  mode: "history",
  base: config("app.url"),
  routes: [...Landing, ...Components, ...Layouts]
})

const GlobalBeforeMiddleware: Middleware[] = [new AuthMiddleware()];

GlobalBeforeMiddleware.forEach(middleware =>
  router.beforeEach(middleware.handle)
)

export default router;
