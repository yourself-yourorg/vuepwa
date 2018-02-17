// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueLocalStore from 'vue-ls';
import VueLogger from 'vuejs-logger';

import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

import App from './App';
import router from './router';

import xlate from './internationalization';

import config from './config';

import HomeView from './components/HomeView';


const LG = console.log; // eslint-disable-line no-console, no-unused-vars

LG(`microservice = ${config.server}`);

Vue.use(VueLogger, config.logger);

Vue.use(VueI18n);
Vue.use(VueLocalStore, { namespace: 'vuesppwa-' });
Vue.use(Buefy);

Vue.config.productionTip = config.productionTip;

Vue.component('home', HomeView);

const messages = xlate; // Make it observable

const locale = navigator.languages[0] || 'en';
const i18n = new VueI18n({
  locale: locale.split('-')[0] || 'en',
  fallbackLocale: 'en',
  // fallbackLocale: locale.split('-')[0] || 'en',
  messages,
});

/* eslint-disable no-new */
const mainVue = new Vue({
  el: '#app',
  i18n,
  router,
  created() {
    window.lgr = this.$log;
    window.ls = this.$ls;
  },
  render: site => site(App),
});

export default mainVue;
