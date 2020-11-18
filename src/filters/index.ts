import Vue from "vue";

import capitalize from "./capitalize";
import currency from "./currency";
import dateFormat from "./dateFormat";

Vue.filter("capitalize", capitalize);
Vue.filter("currency", currency);
Vue.filter("dateFormat", dateFormat);
