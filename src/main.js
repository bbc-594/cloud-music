import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './utils/Antd';
import VueLazyload from 'vue-lazyload';
import '@/assets/icon/iconfont.js';
import IndexHeader from '../src/components/index-header/index-header.vue';
import IconSvg from '../src/components/icon-svg/icon-svg.vue';
import Loading from '../src/components/loading/loading.vue';
import * as filters from '../src/filters/index';

import * as api from '@/api/api';
Vue.component('IconSvg', IconSvg);
Vue.component('IndexHeader', IndexHeader);
Vue.component('Loading', Loading);
Vue.use(VueLazyload, {
  loading: require('../src/assets/images/nopic1.png')
});
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.prototype.$api = api;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
