// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueLocalStore from 'vue-ls';
import VueLogger from 'vuejs-logger';

// import axios from 'axios';
// import VueAxios from 'vue-axios';

import { sync } from 'vuex-router-sync';

import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

import App from './App';
import { store } from './store/store';

import xlate from './internationalization';

import config from './config';

import HomeView from './components/HomeView';

import router from './router';


// const LG = console.log; // eslint-disable-line no-console, no-unused-vars

Vue.use(VueLogger, config.logger);

Vue.use(VueI18n);
Vue.use(VueLocalStore, { namespace: 'vuesppwa-' });
Vue.use(Buefy);

Vue.config.productionTip = config.productionTip;

Vue.component('home', HomeView);

// Vue.use(VueAxios, axios);

const messages = xlate; // Make it observable

const locale = navigator.languages[0] || 'en';
const i18n = new VueI18n({
  locale: locale.split('-')[0] || 'en',
  fallbackLocale: 'en',
  // fallbackLocale: locale.split('-')[0] || 'en',
  messages,
});

sync(store, router);

/* eslint-disable no-new */
const mainVue = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  created() {
    window.lgr = this.$log;
    window.ls = this.$ls;
    this.$log.info(`microservice = ${config.server}`);
    if (this.$route.query.tkn) {
      this.$store.dispatch('keepTkn', this.$route.query.tkn);
    } else {
      this.$store.dispatch('logOut');
    }
  },
  render: site => site(App),
});

export default mainVue;
