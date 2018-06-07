import Vue from 'vue';
import Router from 'vue-router';

import Header from '@/components/Attic/Header';

import { routes as mainLayout } from '@/components/MainLayout';

import { beforeEach as beforeEachTaskAcl } from '@/accessControl';

// import { routes as example } from '@/components/Tests/Component';

import OldHomeView from '@/components/Attic/OldHomeView';
import DetailView from '@/components/Attic/DetailView';
import PostView from '@/components/Attic/PostView';
import DumbA from '@/components/Attic/DumbA';
import DumbB from '@/components/Attic/DumbB';
import Form from '@/components/Attic/Form';

// import { Blog, Article } from '@/components/Blog';
import { routes as blog } from '@/components/Attic/Blog';
// import { routes as poison } from '@/components/Attic/Poison';


import { store } from '../store';

Vue.use(Router);

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

const baseRoutes = [

  {
    path: '/ohv',
    name: 'ohv',
    components: { default: OldHomeView, hdr: Header },
    // meta: { permission: 'visitor' },
  },
  {
    path: '/post',
    name: 'post',
    components: { default: PostView, hdr: Header },
    // meta: { permission: 'visitor' },
  },
  {
    path: '/detail/:id',
    name: 'detail',
    components: { default: DetailView, hdr: Header },
    // meta: { permission: 'visitor' },
  },
  {
    path: '/dc',
    name: 'DA',
    components: { default: DumbA, hdr: Header },
    // meta: { permission: 'visitor' },
  },
  {
    path: '/db',
    name: 'DB',
    components: { default: DumbB, hdr: Header },
    // meta: { permission: 'visitor' },
  },
  {
    path: '/form',
    name: 'form',
    components: { default: Form, hdr: Header },
    // meta: { permission: 'visitor' },
  },
];

const routes = baseRoutes
  .concat(mainLayout)
  // .concat(person)
  // .concat(example)
  // .concat(poison)
  .concat(blog);

const clearErrorNotification = (t, f, n) => { // eslint-disable-line no-unused-vars
  store.dispatch('clearNotifyUser').then(() => n());
};

const keepToken = (t, f, n) => {
  if (window.lgr) {
    window.lgr.debug(`Routing from '${f.name}' to '${t.name}'.`);
    if (t.query.tkn) {
      LG(`
???????????????????
 Do we ever get here?
???????????????????`);
      window.lgr.info(`Query has '${t.query.tkn}'.`);
      store.dispatch('keepTkn', t.query.tkn).then(() => n());
    }
  }
};

let beforeEachTasks = [
  keepToken,
  clearErrorNotification,
  (t, f) => { LG(`TSK 0 ${t}, ${f}`); },
  // (t, f) => { LG(f); },
];

beforeEachTasks = beforeEachTasks.concat(beforeEachTaskAcl);
// beforeEachTasks = beforeEachTasks.concat(beforeEachTaskAuth);

const router = new Router({
  routes,
});

// router.beforeResolve((_to, _from, next) => {
//   LG(`beforeResolve :: '${_from.name}' to '${_to.name}'.`);
//   LG(store._vm.access); // eslint-disable-line no-underscore-dangle
//   next();
// });

router.beforeEach((_to, _from, _next) => {
  LG(`Router.beforeEach ==> Routing from '${_from.name}' to '${_to.name}'. Params '${_from.params}').`);
  LG(_to);
  LG(_from);
  LG(`beforeEachTasks.length ${beforeEachTasks.length}`);
  LG(beforeEachTasks);

  beforeEachTasks.forEach((tsk) => {
    tsk(_to, _from, _next);
  });

  _next();
});

export default router;
