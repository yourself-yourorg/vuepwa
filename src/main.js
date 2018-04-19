// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueLocalStore from 'vue-ls';
import VueKindergarten from 'vue-kindergarten';

import Acl from 'vue-acl';
import VueLogger from 'vuejs-logger';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

import formulate from 'vue-formulate';

// import axios from 'axios';
// import VueAxios from 'vue-axios';

import { sync } from 'vuex-router-sync';

import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

import App from './App';
import { store } from './store';

import xlate from './internationalization';

import config from './config';

import HomeView from './components/HomeView';

import { currentUser } from './accessControl'; // eslint-disable-line no-unused-vars
import router from './router';

// const LG = console.log; // eslint-disable-line no-console, no-unused-vars

Vue.use(VueLogger, config.logger);

Vue.use(VueI18n);
Vue.use(VueLocalStore, { namespace: 'vuesppwa-' });

Vue.use(VueKindergarten, currentUser);

// Vue.use(Acl, { router, init: ['visitor', 'member'] });
Vue.use(Acl, { router, init: ['visitor'] });

Vue.use(Buefy, {
  defaultIconPack: 'fa',
});

Vue.use(formulate);

Vue.component('home', HomeView);
Vue.component('icon', Icon);

Vue.config.productionTip = config.productionTip;

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
    window.version = config.version;
    this.$log.info(`microservice = ${config.server}`);
    if (this.$route.query.tkn) {
      this.$store.dispatch('keepTkn', this.$route.query.tkn);
    } else {
      // this.$store.dispatch('logOut');
    }
  },
  render: site => site(App),
});

export default mainVue;
