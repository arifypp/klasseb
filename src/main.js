import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Jquery from "jquery";
import bootstrap from "bootstrap";
import vueCarousel from 'vue-carousel';
import SplitCarosel from 'vue-split-carousel';

window.$ = window.jQuery = Jquery

import "./assets/css/style.css";
import "./assets/css/custom.css";


Vue.config.productionTip = false;
Vue.config.ignoredElements = [/^ion-/]

let app;
if (!app) {
  new Vue({
    router,
    store,
    Jquery,
    bootstrap,
    vueCarousel,
    SplitCarosel,
    render: (h) => h(App),
  }).$mount('#app');
}
