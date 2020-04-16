import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './registerServiceWorker'
import VueGeolocation from 'vue-browser-geolocation'

import router from "@/router";
import store from "./store/store";

Vue.config.productionTip = false
Vue.use(VueGeolocation)

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
