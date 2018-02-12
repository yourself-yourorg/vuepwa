// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueLocalStore from 'vue-ls';

import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

import App from './App';
import router from './router';

import xlate from './internationalization';

import config from './config';

import HomeView from './components/HomeView';


const LG = console.log; // eslint-disable-line no-console, no-unused-vars

LG(`config = ${config.server}`);

Vue.use(VueI18n);
Vue.use(VueLocalStore, { namespace: 'vuesppwa' });
Vue.use(Buefy);
Vue.config.productionTip = false;

Vue.component('home', HomeView);

const messages = xlate; // Make it observable

const locale = navigator.languages[0] || 'en';
const i18n = new VueI18n({
  locale: locale.split('-')[0] || 'en',
  fallbackLocale: 'en',
  // fallbackLocale: locale.split('-')[0] || 'en',
  messages,
});

/* eslint-disable no-console */
// console.log(`-----   ${mmm.en.message.hello}`);
// console.log(`-----   ${messages.es.message.hello}`);
// console.log(`-----   ${navigator.languages[0]}`);
// console.log(`-----   ${navigator.languages[0].split('-')[0]}`);
/* eslint-enable no-console */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  render: site => site(App),
  // template: '<App/>',
  // components: { App },
});
// .$mount('#app');

