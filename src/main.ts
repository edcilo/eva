import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import i18n from "./lang";
import router from "./router";
import store from "./store";

import "./filters";
import "./directives";

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
