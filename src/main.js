import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueApexCharts from "vue-apexcharts";

Vue.use(VueApexCharts);
Vue.use(require("vue-shortkey"));
Vue.component("apexchart", VueApexCharts);
library.add(faUserSecret);

Vue.component("font-awesome-icon", FontAwesomeIcon);

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: (h) => h(App),
}).$mount("#app");
