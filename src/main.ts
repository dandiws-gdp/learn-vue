import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "@/assets/css/tailwind.css";
import { createProvider } from "./vue-apollo";
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/en.json";
// import { email, min, max, alpha_spaces, is } from "vee-validate/dist/rules";

for (const [key, rule] of Object.entries(rules)) {
  extend(key, rule);
}
localize("en", en);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

const containsJohnDoe = (value: string) =>
  value.toLocaleLowerCase().includes("john doe");

extend("notJohnDoe", {
  validate: (value: string) => !containsJohnDoe(value),
  message: "This {_field_} cannot contains John Doe",
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");
