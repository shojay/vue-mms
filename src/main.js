import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store/index"
import axios from "axios"
import { Base64 } from "js-base64"
import VueLazyload from "vue-lazyload"
import { Token } from "./models/token"

axios.defaults.baseURL = "http://localhost:3000/v1"
axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token")
    const base_64 = Base64.encode(token + ":")
    config.headers.common["Authorization"] = "Basic " + base_64
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  (config) => {
    return config
  },
  (err) => {}
)

Vue.use(VueLazyload, {
  loading: "./assets/images/lazyloading.gif",
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
